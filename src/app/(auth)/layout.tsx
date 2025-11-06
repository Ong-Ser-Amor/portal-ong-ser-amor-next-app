'use client';

import ProtectedRoute from '@/components/features/auth/ProtectedRoute';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/SideBar';
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { ToastContainer } from 'react-toastify';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSidebarToggle = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  return (
    <ProtectedRoute>
      <div 
        className='flex h-screen' 
        style={{ background: 'var(--bg-primary, #f5f5f5)' }}
      >
        <Sidebar
          mobileOpen={mobileMenuOpen}
          onMobileToggle={toggleMobileMenu}
          onCollapsedChange={handleSidebarToggle}
        />

        <div
          className='content-wrapper flex flex-1 flex-col overflow-hidden'
          style={{
            marginLeft: sidebarCollapsed ? '80px' : '260px',
            transition: 'margin-left 0.3s ease',
          }}
        >
          <Header>
            <button
              className='mr-4 text-gray-700 md:hidden'
              onClick={toggleMobileMenu}
              aria-label='Menu'
            >
              <FiMenu size={24} />
            </button>
          </Header>

          <main className='flex-1 overflow-y-auto p-4'>
            {children}
            <ToastContainer position='top-right' autoClose={4000} />
          </main>

          <Footer />
        </div>
      </div>
    </ProtectedRoute>
  );
}
