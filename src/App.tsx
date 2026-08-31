import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import DocsLayout from './layouts/DocsLayout';
import HomePage from './pages/HomePage';
import DocPage from './pages/DocPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<DocsLayout />}>
        <Route path="/docs/:slug" element={<DocPage />} />
        <Route path="/docs" element={<Navigate to="/docs/introduction" replace />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
