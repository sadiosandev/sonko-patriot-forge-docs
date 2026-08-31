import React from 'react';
import { Link } from 'react-router-dom';
import { docs } from '../docs.generated';

export default function PageNav({ id }: { id: string }) {
  const index = docs.findIndex((doc) => doc.id === id);
  const previous = index > 0 ? docs[index - 1] : null;
  const next = index >= 0 && index < docs.length - 1 ? docs[index + 1] : null;

  return (
    <div className="page-nav-grid">
      {previous ? (
        <Link to={previous.path} className="page-nav-card">
          <span>← Précédent</span><strong>{previous.title}</strong>
        </Link>
      ) : <div />}
      {next && (
        <Link to={next.path} className="page-nav-card text-end">
          <span>Suivant →</span><strong>{next.title}</strong>
        </Link>
      )}
    </div>
  );
}
