import React from 'react';
import { NavLink } from 'react-router-dom';
import { docs, docCategories } from '../docs.generated';

const icons: Record<string, string> = {
  'Getting Started': 'bi-rocket-takeoff',
  'Artisan Commands': 'bi-terminal',
  'Core Generator': 'bi-boxes',
  'API & Security': 'bi-shield-lock',
  'Features': 'bi-stars',
  'Swagger / OpenAPI': 'bi-braces-asterisk',
  'Configuration': 'bi-sliders',
  'Advanced': 'bi-diagram-3',
  'Operations': 'bi-wrench-adjustable-circle',
  'Web Dashboard': 'bi-window-sidebar',
  'Web Authentication': 'bi-person-lock',
  'Web Scaffold': 'bi-layout-text-window-reverse',
  'Project': 'bi-journal-code',
  'Reference': 'bi-book',
};

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open && <button className="sidebar-backdrop d-xl-none" onClick={onClose} aria-label="Fermer" />}
      <aside className={`docs-sidebar ${open ? 'is-open' : ''}`}>
        <div className="sidebar-inner">
          {docCategories.map((category) => {
            const items = docs.filter((doc) => doc.category === category).sort((a, b) => a.order - b.order);
            if (!items.length) return null;
            return (
              <section className="sidebar-section" key={category}>
                <div className="sidebar-heading"><i className={`bi ${icons[category] || 'bi-folder2'}`} />{category}</div>
                <nav>
                  {items.map((doc) => (
                    <NavLink
                      to={doc.path}
                      key={doc.id}
                      className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                      onClick={onClose}
                    >
                      {doc.title}
                    </NavLink>
                  ))}
                </nav>
              </section>
            );
          })}
        </div>
      </aside>
    </>
  );
}
