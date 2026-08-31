import React from 'react';
import Fuse from 'fuse.js';
import { useNavigate } from 'react-router-dom';
import { docs } from '../docs.generated';
import { stripMarkdown } from '../utils/markdown';

const searchable = docs.map((doc) => ({ ...doc, text: stripMarkdown(doc.content) }));
const fuse = new Fuse(searchable, {
  keys: [
    { name: 'title', weight: 0.5 },
    { name: 'category', weight: 0.2 },
    { name: 'text', weight: 0.3 },
  ],
  threshold: 0.32,
  ignoreLocation: true,
  minMatchCharLength: 2,
});

export default function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = React.useState('');
  const navigate = useNavigate();
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30);
    if (!open) setQuery('');
  }, [open]);

  React.useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [onClose]);

  if (!open) return null;

  const results = query.trim()
    ? fuse.search(query, { limit: 12 }).map((result) => result.item)
    : docs.slice(0, 8);

  const go = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="search-overlay" role="dialog" aria-modal="true" onMouseDown={onClose}>
      <div className="search-panel" onMouseDown={(e) => e.stopPropagation()}>
        <div className="search-input-wrap">
          <i className="bi bi-search" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher commandes, options, fonctionnalités…"
          />
          <kbd>ESC</kbd>
        </div>
        <div className="search-results">
          {results.map((doc) => (
            <button className="search-result" key={doc.id} onClick={() => go(doc.path)}>
              <span className="search-result-icon"><i className="bi bi-file-earmark-text" /></span>
              <span>
                <strong>{doc.title}</strong>
                <small>{doc.category}</small>
              </span>
              <i className="bi bi-arrow-up-right" />
            </button>
          ))}
          {!results.length && <div className="search-empty">Aucun résultat pour « {query} ».</div>}
        </div>
      </div>
    </div>
  );
}
