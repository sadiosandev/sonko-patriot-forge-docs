import React from 'react';
import type { TocItem } from '../utils/markdown';

export default function TableOfContents({ items }: { items: TocItem[] }) {
  const [active, setActive] = React.useState<string>('');

  React.useEffect(() => {
    const headings = items.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: '-90px 0px -70% 0px', threshold: [0, 1] },
    );
    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <aside className="docs-toc d-none d-xxl-block">
      <div className="toc-card">
        <div className="toc-title">Sur cette page</div>
        <nav>
          {items.map((item) => (
            <a
              key={`${item.level}-${item.id}`}
              href={`#${item.id}`}
              className={`toc-link level-${item.level} ${active === item.id ? 'active' : ''}`}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
