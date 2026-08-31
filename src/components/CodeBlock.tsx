import React from 'react';
import { reactNodeToText } from '../utils/reactNodeToText';

function detectLanguage(className?: string): string {
  const match = className?.match(/(?:^|\s)language-([^\s]+)/);
  return match?.[1] ?? 'text';
}

export default function CodeBlock({ children, className }: { children: React.ReactNode; className?: string }) {
  const [copied, setCopied] = React.useState(false);
  const language = detectLanguage(className);
  const text = reactNodeToText(children).replace(/\n$/, '');

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="code-shell">
      <div className="code-toolbar">
        <span>{language}</span>
        <button type="button" onClick={copy} aria-label="Copier le code">
          <i className={`bi ${copied ? 'bi-check2' : 'bi-copy'}`} /> {copied ? 'Copié' : 'Copier'}
        </button>
      </div>
      <pre>
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
}
