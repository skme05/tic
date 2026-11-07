import { Link } from 'react-router';

export interface RelatedItem {
  to: string;
  tag: string;
  name: string;
  text: string;
}

/* Trois cartes « Continuer l'exploration » en fin de page. */
export function RelatedCards({ items }: { items: RelatedItem[] }) {
  return (
    <div className="related reveal">
      {items.map((it) => (
        <Link key={it.to} to={it.to}>
          <i>{it.tag}</i>
          <b>{it.name}</b>
          <span>{it.text}</span>
        </Link>
      ))}
    </div>
  );
}
