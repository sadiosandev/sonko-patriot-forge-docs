import React from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';

export default function DocsLayout() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="docs-app-shell">
      <Topbar onMenu={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="docs-main">
        <Outlet />
      </main>
    </div>
  );
}
