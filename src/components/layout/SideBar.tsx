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

export default function Sidebar({ mobileOpen, onMobileToggle }: SidebarProps) {
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
    setCollapsed(!collapsed);
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
        className={`fixed z-50 h-full md:static md:z-auto ${collapsed ? 'w-16' : 'w-64'} flex flex-col bg-gray-800 text-white transition-all duration-300 ${mobileOpen ? 'left-0' : '-left-64 md:left-0'} `}
      >
        <div
          className={`border-b border-gray-700 p-5 ${collapsed ? 'justify-center' : ''} flex items-center`}
        >
          {!collapsed && (
            <h1 className='text-xl font-bold'>Portal Ong Ser Amor</h1>
          )}

          {/* Botão de fechar para mobile */}
          <button
            className='ml-auto text-white md:hidden'
            onClick={onMobileToggle}
          >
            <FiX size={24} />
          </button>
        </div>

        <nav className='flex-1 overflow-y-auto p-4'>
          <ul className='space-y-2'>
            {menuItems.map((item, index) => (
              <li key={item.label + index}>
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => toggleSubmenu(item.label)}
                      className={`flex w-full items-center justify-between ${collapsed ? 'justify-center' : ''} rounded-md p-3 transition-colors ${isSubmenuActive(item.submenu) ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
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
                                className={`flex items-center rounded-md p-2 transition-colors ${
                                  isActive(subItem.path)
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-300 hover:bg-gray-700'
                                }`}
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
                      className={`flex items-center ${collapsed ? 'justify-center' : ''} rounded-md p-3 transition-colors ${
                        isActive(item.path || '')
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:bg-gray-700'
                      }`}
                      title={collapsed ? item.label : ''}
                    >
                      <span className={collapsed ? '' : 'mr-3'}>
                        {item.icon}
                      </span>
                      {!collapsed && <span>{item.label}</span>}
                    </div>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className='border-t border-gray-700 p-4'>
          <button
            onClick={toggleSidebar}
            className='flex w-full items-center justify-center rounded-md p-3 text-gray-300 transition-colors hover:bg-gray-700'
            title={collapsed ? 'Expandir menu' : 'Recolher menu'}
          >
            {collapsed ? (
              <FiChevronRight size={20} />
            ) : (
              <FiChevronLeft size={20} />
            )}
          </button>
        </div>
      </div>
    </>
  );
}
