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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <ProtectedRoute>
      <div className='flex h-screen bg-gray-50'>
        <Sidebar
          mobileOpen={mobileMenuOpen}
          onMobileToggle={toggleMobileMenu}
        />

        <div className='flex flex-1 flex-col overflow-hidden'>
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
