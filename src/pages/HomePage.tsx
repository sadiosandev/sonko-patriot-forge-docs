import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import ThemeToggle from '../components/ThemeToggle';

const features = [
  ['bi-lightning-charge-fill', 'Laravel 13 Native', 'Attributes PHP, route model binding, modern casts et conventions Laravel 13.'],
  ['bi-braces', 'API Generator', 'Controllers, Requests, Resources, Data DTOs, Query Builder, tests et repositories.'],
  ['bi-window-sidebar', 'Web Scaffold', 'Dashboard moderne, Auth Kit, Bootstrap 5 et Yajra Laravel DataTables.'],
  ['bi-shield-lock-fill', 'Security', 'Sanctum, Policies, Permissions, auth web, vérification email et JSON errors.'],
  ['bi-file-earmark-spreadsheet-fill', 'Business Features', 'Excel, Scout, Activitylog, Media, queues, notifications et broadcast.'],
  ['bi-code-square', 'OpenAPI', 'Swagger/OpenAPI moderne avec PHP Attributes et Swagger UI intégrée.'],
];

export default function HomePage() {
  return (
    <div className="landing-page">
      <nav className="landing-nav container-fluid px-4 px-lg-5">
        <Link to="/" className="text-decoration-none"><Logo /></Link>
        <div className="d-flex align-items-center gap-2">
          <Link to="/docs/introduction" className="btn btn-link text-decoration-none landing-link">Docs</Link>
          <a href="https://github.com" className="btn btn-icon" target="_blank" rel="noreferrer"><i className="bi bi-github" /></a>
          <ThemeToggle />
        </div>
      </nav>

      <section className="hero-section container">
        <div className="hero-badge"><span></span> Modern Laravel API Generator · Laravel 13</div>
        <h1>Build Laravel APIs<br /><span>faster, cleaner, smarter.</span></h1>
        <p>SonkoPatriot Forge automatise vos APIs, scaffolds web, permissions, Data DTOs, Query Builder, Excel, Scout, OpenAPI et bien plus.</p>
        <div className="hero-actions">
          <Link to="/docs/quick-start" className="btn btn-primary btn-lg">Get started <i className="bi bi-arrow-right" /></Link>
          <Link to="/docs/complete-artisan-command-catalog" className="btn btn-outline-secondary btn-lg">Browse commands</Link>
        </div>
        <div className="install-command">
          <span>composer</span>
          <code>composer require sadio-sanghare/sonko-patriot-forge:@dev</code>
          <i className="bi bi-copy" />
        </div>
      </section>

      <section className="features-section container">
        <div className="section-kicker">Everything in one forge</div>
        <h2>Une documentation pensée comme un produit.</h2>
        <div className="row g-4 mt-2">
          {features.map(([icon, title, text]) => (
            <div className="col-md-6 col-xl-4" key={title}>
              <div className="feature-card h-100">
                <div className="feature-icon"><i className={`bi ${icon}`} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="landing-footer container">
        <Logo />
        <span>SonkoPatriot Forge · MIT License</span>
      </footer>
    </div>
  );
}
