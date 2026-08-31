import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div>
        <div className="display-1 fw-bold">404</div>
        <h1>Page introuvable</h1>
        <p>La page de documentation demandée n'existe pas.</p>
        <Link className="btn btn-primary" to="/docs/introduction">Retour à la documentation</Link>
      </div>
    </div>
  );
}
