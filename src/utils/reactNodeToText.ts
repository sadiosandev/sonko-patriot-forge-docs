import React from 'react';

export function reactNodeToText(node: React.ReactNode): string {
  if (node === null || node === undefined || typeof node === 'boolean') {
    return '';
  }

  if (typeof node === 'string' || typeof node === 'number' || typeof node === 'bigint') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(reactNodeToText).join('');
  }

  if (React.isValidElement(node)) {
    const props = node.props as { children?: React.ReactNode };
    return reactNodeToText(props.children);
  }

  return '';
}
