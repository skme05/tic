import { testimonials } from '~/content/testimonials';

/* Bande défilante des témoignages (le défilement infini est géré par
   l'effet « rails » : le contenu est dupliqué puis translaté en CSS). */
export function TestimonialsRail({ className = 'rail qrail reveal' }: { className?: string }) {
  return (
    <div className={className}>
      <div className="rail__track" id="temoRail" data-speed="42">
        {testimonials.map((t) => (
          <blockquote className="q" key={t.name}>
            <div className="q__st" role="img" aria-label={`${t.rating} étoiles sur 5`}>
              {Array.from({ length: 5 }, (_, i) => (
                <i key={i} className={i < t.rating ? undefined : 'off'}></i>
              ))}
            </div>
            <p>{t.text}</p>
            <footer>
              <b>{t.name}</b>
              <i>{t.role}</i>
            </footer>
          </blockquote>
        ))}
      </div>
    </div>
  );
}
