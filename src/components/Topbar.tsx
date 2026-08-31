import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import SearchDialog from './SearchDialog';

export default function Topbar({ onMenu }: { onMenu: () => void }) {
  const [searchOpen, setSearchOpen] = React.useState(false);

  React.useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, []);

  return (
    <>
      <header className="docs-topbar">
        <div className="docs-topbar-left">
          <button className="btn btn-icon d-xl-none" onClick={onMenu} aria-label="Ouvrir le menu">
            <i className="bi bi-list" />
          </button>
          <Link to="/" className="text-decoration-none"><Logo /></Link>
          <span className="version-pill d-none d-md-inline-flex">Laravel 13</span>
        </div>

        <button className="docs-search-trigger" onClick={() => setSearchOpen(true)}>
          <i className="bi bi-search" />
          <span>Rechercher dans la documentation</span>
          <kbd>Ctrl K</kbd>
        </button>

        <div className="docs-topbar-actions">
          <select className="form-select version-select" defaultValue="0.9.6" aria-label="Version">
            <option value="0.9.6">v0.9.6</option>
            <option value="0.9.x">v0.9.x</option>
          </select>
          <a className="btn btn-icon d-none d-sm-inline-flex" href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
            <i className="bi bi-github" />
          </a>
          <ThemeToggle />
        </div>
      </header>
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
