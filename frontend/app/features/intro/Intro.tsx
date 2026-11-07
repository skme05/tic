import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '~/lib/dom/scope';

const KEY = 'tic_intro_2026';

/* Vidéo d'entrée de l'accueil : jouée une fois par session, puis on entre
   sur le site. Clic, Échap, Entrée, Espace ou « Passer l'intro » l'arrêtent.
   Jamais affichée si le visiteur préfère réduire les animations.

   Rendu côté serveur : l'intro est présente dans le HTML pré-rendu (pas de
   flash de la page avant elle) ; le navigateur la retire aussitôt si elle
   a déjà été vue dans la session. */
export function Intro() {
  const [state, setState] = useState<'on' | 'out' | 'gone'>('on');
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === '1';
    } catch {
      /* stockage indisponible : on montre l'intro */
    }
    if (seen || prefersReducedMotion()) {
      setState('gone');
      return;
    }

    const vid = videoRef.current;
    let done = false;
    const timers: number[] = [];
    document.body.classList.add('is-locked');

    const enter = () => {
      if (done) return;
      done = true;
      try {
        sessionStorage.setItem(KEY, '1');
      } catch {
        /* ignoré */
      }
      setState('out');
      document.body.classList.remove('is-locked');
      window.scrollTo(0, 0);
      vid?.pause();
      timers.push(
        window.setTimeout(() => {
          setState('gone');
          window.dispatchEvent(new Event('resize'));
        }, 1000),
      );
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') enter();
    };
    document.addEventListener('keydown', onKey);
    const box = document.getElementById('intro');
    box?.addEventListener('click', enter);

    if (!vid) {
      timers.push(window.setTimeout(enter, 1200));
    } else {
      /* chien de garde : vidéo bloquée plus de 4 s → on entre */
      let lastBeat = Date.now();
      const beat = () => (lastBeat = Date.now());
      const onTime = () => {
        beat();
        if (barRef.current && vid.duration) barRef.current.style.width = (vid.currentTime / vid.duration) * 100 + '%';
      };
      vid.addEventListener('timeupdate', onTime);
      vid.addEventListener('playing', beat);
      vid.addEventListener('ended', enter);
      vid.addEventListener('error', enter);
      const watchdog = window.setInterval(() => {
        if (done || Date.now() - lastBeat > 4000) {
          window.clearInterval(watchdog);
          enter();
        }
      }, 500);
      timers.push(watchdog);
      /* filet de sécurité : jamais enfermé au-delà de 12 s */
      timers.push(window.setTimeout(enter, 12000));
      vid.muted = true;
      vid.play()?.catch(enter); /* lecture automatique refusée : on entre directement */
    }

    return () => {
      document.removeEventListener('keydown', onKey);
      box?.removeEventListener('click', enter);
      timers.forEach((t) => {
        window.clearTimeout(t);
        window.clearInterval(t);
      });
      document.body.classList.remove('is-locked');
    };
  }, []);

  if (state === 'gone') return null;
  return (
    <div className={'intro' + (state === 'out' ? ' is-out' : '')} id="intro">
      <video
        ref={videoRef}
        className="intro__v"
        src="/assets/video/intro-couloir.mp4"
        poster="/assets/video/intro-couloir.webp"
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="intro__ui">
        <div className="intro__brand">
          <img src="/assets/img/logo-tic.webp" width="600" height="138" alt="TIC — The Infinite Corridor" />
        </div>
        <span className="intro__bar" aria-hidden="true">
          <i ref={barRef}></i>
        </span>
        <button className="intro__skip" type="button">
          Passer l'intro
        </button>
      </div>
    </div>
  );
}
