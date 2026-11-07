import { Fragment } from 'react';

/** Affiche un court texte de contenu contenant <em>…</em> et <br />, sans
 *  injecter de HTML brut (pas de dangerouslySetInnerHTML). */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(<em>.*?<\/em>|<br\s*\/?>)/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) => {
        const em = p.match(/^<em>(.*)<\/em>$/);
        if (em) return <em key={i}>{em[1]}</em>;
        if (/^<br/.test(p)) return <br key={i} />;
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}
