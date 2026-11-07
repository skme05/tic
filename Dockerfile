# =============================================================================
# Site TIC — image Docker de production
# Le site est pré-rendu en HTML statique (React Router, SSG) : on le compile
# avec Node, puis on le sert avec nginx (léger, rapide, sans Node en prod).
#
#   docker compose up -d --build        → http://localhost:4000
# =============================================================================

# =========================
# BUILD STAGE
# =========================
FROM node:22-alpine AS builder

WORKDIR /app

# Variables lues AU MOMENT DU BUILD (elles sont intégrées au site compilé).
#  - VITE_SITE_URL : adresse publique du site (balises SEO, sitemap)
#  - VITE_API_URL  : adresse de l'API Django (formulaires, espace client).
#                    Vide = pas encore de backend.
ARG VITE_SITE_URL=https://infinitecorridor.io
ARG VITE_API_URL=
ENV VITE_SITE_URL=$VITE_SITE_URL \
    VITE_API_URL=$VITE_API_URL

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build \
 # anciennes adresses .html → nouvelles adresses (format nginx)
 && awk 'NF==3 && $1 ~ /^\// { printf "location = %s { return %s %s; }\n", $1, $3, $2 }' \
      build/client/_redirects > build/redirects.conf

# =========================
# PRODUCTION STAGE
# =========================
# nginx « unprivileged » : tourne sans droits root (utilisateur nginx, uid 101)
FROM nginxinc/nginx-unprivileged:1.27-alpine

COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY deploy/security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --from=builder /app/build/redirects.conf /etc/nginx/snippets/redirects.conf
COPY --from=builder /app/build/client /usr/share/nginx/html

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:4000/healthz || exit 1
