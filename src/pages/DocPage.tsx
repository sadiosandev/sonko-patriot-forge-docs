import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { docs } from '../docs.generated';
import MarkdownRenderer from '../components/MarkdownRenderer';
import TableOfContents from '../components/TableOfContents';
import PageNav from '../components/PageNav';
import { extractToc } from '../utils/markdown';

export default function DocPage() {
  const { slug } = useParams();
  const doc = docs.find((item) => item.id === slug);

  React.useEffect(() => {
    if (doc) document.title = `${doc.title} · SonkoPatriot Forge`;
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [doc?.id]);

  if (!doc) return <Navigate to="/docs/introduction" replace />;

  const toc = extractToc(doc.content);

  return (
    <div className="docs-page-grid">
      <article className="docs-article">
        <div className="docs-breadcrumbs">
          <span>Documentation</span><i className="bi bi-chevron-right" /><span>{doc.category}</span>
        </div>
        <MarkdownRenderer content={doc.content} />
        <PageNav id={doc.id} />
      </article>
      <TableOfContents items={toc} />
    </div>
  );
}
