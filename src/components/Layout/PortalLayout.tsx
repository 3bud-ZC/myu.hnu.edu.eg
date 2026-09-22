import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { UnofficialDemoBadge } from './UnofficialDemoBadge';

export const PortalLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Determine page title based on path
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/transcript':
        return 'Transcript';
      case '/registration':
        return 'Registration';
      case '/payments':
        return 'Payments';
      case '/student-info':
        return 'Student Info';
      default:
        return 'Student Portal';
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6fa] flex">
      {/* Left Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 md:pl-64 transition-all duration-300">
        {/* Top Navigation Bar */}
        <TopBar
          title={getPageTitle()}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Global Demo Banner Reminder */}
        <div className="px-4 md:px-6 pt-3 sm:hidden">
          <UnofficialDemoBadge variant="topbar" className="w-full justify-center" />
        </div>

        {/* Page Inner Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-7 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
