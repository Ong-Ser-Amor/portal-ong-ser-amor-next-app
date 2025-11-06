'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { FaBook, FaTachometerAlt } from 'react-icons/fa';
import {
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiChevronUp,
  FiSettings,
  FiX,
} from 'react-icons/fi';

interface SidebarProps {
  mobileOpen: boolean;
  onMobileToggle: () => void;
  onCollapsedChange?: (collapsed: boolean) => void;
}

interface MenuItem {
  path?: string;
  icon: React.ReactNode;
  label: string;
  submenu?: {
    path: string;
    icon: React.ReactNode;
    label: string;
  }[];
}

export default function Sidebar({
  mobileOpen,
  onMobileToggle,
  onCollapsedChange,
}: SidebarProps) {
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);
  const [collapsed, setCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<{
    [key: string]: boolean;
  }>({
    Estoque: false,
  });

  // Fechar o menu mobile quando mudar de rota
  useEffect(() => {
    if (prevPathnameRef.current !== pathname && mobileOpen) {
      onMobileToggle();
    }
    prevPathnameRef.current = pathname;
  }, [pathname, mobileOpen, onMobileToggle]);

  const toggleSidebar = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    onCollapsedChange?.(newCollapsed);
  };

  const toggleSubmenu = (label: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  const isSubmenuActive = (submenuItems: { path: string }[]) => {
    return submenuItems.some((item) => pathname === item.path);
  };
  const menuItems: MenuItem[] = [
    {
      path: '/courses',
      icon: <span className='text-xl'>📚</span>,
      label: 'Courses',
    },
    {
      path: '/students',
      icon: <span className='text-xl'>👥</span>,
      label: 'Students',
    },
    {
      path: '/configuracoes',
      icon: <FiSettings size={20} />,
      label: 'Configurações',
    },
  ];

  return (
    <>
      {/* Overlay para dispositivos móveis */}
      {mobileOpen && (
        <div
          className='fixed inset-0 z-40 bg-black/50 md:hidden'
          onClick={onMobileToggle}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed h-full ${collapsed ? 'w-20' : 'w-[260px]'} flex flex-col bg-white text-gray-800 ${mobileOpen ? 'left-0 z-50' : '-left-64 md:left-0 md:z-101'} `}
        style={{ 
          boxShadow: '2px 0 10px rgba(0, 0, 0, 0.05)',
          transition: 'width 0.3s ease'
        }}
      >
        {/* Header com Logo e Toggle */}
        <div className='relative border-b-2 border-gray-200 px-5 py-6'>
          {!collapsed && (
            <div className='flex items-center gap-3'>
              {/* Logo Icon com Gradiente */}
              <div className='flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-blue-600 text-xl font-bold text-white shadow-md'>
                SA
              </div>

              {/* Logo Text */}
              <div className='flex flex-col'>
                <h2 className='text-lg leading-tight font-bold text-gray-800'>
                  ONG Ser Amor
                </h2>
                <p className='text-xs text-gray-500'>Portal</p>
              </div>
            </div>
          )}

          {/* Toggle Button */}
          <button
            onClick={toggleSidebar}
            className={`${collapsed ? 'left-1/2 -translate-x-1/2' : 'right-3'} absolute top-1/2 hidden -translate-y-1/2 rounded-lg bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 md:block`}
            style={{ transition: 'all 0.3s' }}
            title={collapsed ? 'Expandir menu' : 'Recolher menu'}
          >
            {collapsed ? (
              <FiChevronRight size={18} />
            ) : (
              <FiChevronLeft size={18} />
            )}
          </button>

          {/* Botão de fechar para mobile */}
          <button
            className='absolute top-1/2 right-3 -translate-y-1/2 text-gray-600 md:hidden'
            onClick={onMobileToggle}
          >
            <FiX size={24} />
          </button>
        </div>

        <nav className='flex-1 overflow-y-auto py-5'>
          <ul className='space-y-1'>
            {menuItems.map((item, index) => (
              <li key={item.label + index}>
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => toggleSubmenu(item.label)}
                      className={`flex w-full items-center justify-between ${collapsed ? 'justify-center' : ''} rounded-lg p-3 ${isSubmenuActive(item.submenu) ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                      style={{ transition: 'all 0.3s' }}
                    >
                      <div className='flex items-center'>
                        <span className={collapsed ? '' : 'mr-3'}>
                          {item.icon}
                        </span>
                        {!collapsed && <span>{item.label}</span>}
                      </div>
                      {!collapsed &&
                        (expandedMenus[item.label] ? (
                          <FiChevronUp size={16} />
                        ) : (
                          <FiChevronDown size={16} />
                        ))}
                    </button>

                    {expandedMenus[item.label] && !collapsed && (
                      <ul className='mt-2 space-y-2 pl-8'>
                        {item.submenu.map((subItem) => (
                          <li key={subItem.path}>
                            <Link href={subItem.path}>
                              <div
                                className={`flex items-center rounded-lg p-2 ${
                                  isActive(subItem.path)
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                                style={{ transition: 'all 0.3s' }}
                              >
                                <span className='mr-2'>{subItem.icon}</span>
                                <span>{subItem.label}</span>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link href={item.path || '#'}>
                    <div
                      className={`mx-3 flex items-center ${collapsed ? 'justify-center' : ''} rounded-lg px-5 py-3.5 ${
                        isActive(item.path || '')
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-600 hover:bg-gray-200'
                      }`}
                      style={{ transition: 'all 0.3s' }}
                      title={collapsed ? item.label : ''}
                    >
                      <span className={collapsed ? '' : 'mr-3'}>
                        {item.icon}
                      </span>
                      {!collapsed && (
                        <span className='font-medium'>{item.label}</span>
                      )}
                    </div>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
