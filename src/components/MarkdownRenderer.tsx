import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import CodeBlock from './CodeBlock';
import { reactNodeToText } from '../utils/reactNodeToText';

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'append', properties: { className: ['heading-anchor'] } }],
        rehypeHighlight,
      ]}
      components={{
        code({ className, children, ...props }) {
          const text = reactNodeToText(children);
          const inline = !className && !text.includes('\n');
          if (inline) return <code className="inline-code" {...props}>{children}</code>;
          return <CodeBlock className={className}>{children}</CodeBlock>;
        },
        pre({ children }) {
          return <>{children}</>;
        },
        blockquote({ children }) {
          return <div className="docs-callout"><i className="bi bi-info-circle-fill" /><div>{children}</div></div>;
        },
        table({ children }) {
          return <div className="table-responsive docs-table-wrap"><table className="table table-bordered align-middle">{children}</table></div>;
        },
        a({ href, children, ...props }) {
          const external = href?.startsWith('http');
          return <a href={href} {...props} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>{children}{external && <i className="bi bi-box-arrow-up-right ms-1 small" />}</a>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
