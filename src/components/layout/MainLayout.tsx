import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  showSidebar = true 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <div className="flex">
        {showSidebar && (
          <div className="hidden lg:block w-80 fixed left-0 top-16 h-[calc(100vh-64px)] overflow-y-auto">
            <Sidebar />
          </div>
        )}
        <main className={`flex-1 ${showSidebar ? 'lg:ml-80' : ''} pt-16`}>
          <div className="container mx-auto px-4 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};