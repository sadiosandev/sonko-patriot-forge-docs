import React from 'react';

const key = 'spforge-docs-theme';

export default function ThemeToggle() {
  const [theme, setTheme] = React.useState(() => localStorage.getItem(key) || 'light');

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(key, theme);
  }, [theme]);

  return (
    <button
      className="btn btn-icon"
      type="button"
      aria-label="Basculer le thème"
      onClick={() => setTheme((value) => (value === 'dark' ? 'light' : 'dark'))}
    >
      <i className={`bi ${theme === 'dark' ? 'bi-sun-fill' : 'bi-moon-stars'}`} />
    </button>
  );
}
