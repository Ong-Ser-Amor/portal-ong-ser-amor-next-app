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
import { useThemeObserver } from '@/hooks/useThemeObserver';

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

  useThemeObserver();

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
      path: '/locations',
      icon: <span className='text-xl'>📍</span>,
      label: 'Locais',
    },
    {
      path: '/asset-categories',
      icon: <span className='text-xl'>🏷️</span>,
      label: 'Categorias de Patrimônio',
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
        className={`fixed h-full ${collapsed ? 'w-20' : 'w-[260px]'} flex flex-col ${mobileOpen ? 'left-0 z-50' : '-left-64 md:left-0 md:z-101'} `}
        style={{
          background: 'var(--bg-secondary, #ffffff)',
          boxShadow: '2px 0 10px var(--card-shadow, rgba(0, 0, 0, 0.05))',
          transition: 'width 0.3s ease',
        }}
      >
        {/* Header com Logo e Toggle */}
        <div
          className='relative px-5 py-6'
          style={{
            borderBottom: '2px solid var(--border-color, #f0f0f0)',
          }}
        >
          {!collapsed && (
            <div className='flex items-center gap-3'>
              {/* Logo Icon com Gradiente */}
              <div
                className='flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-xl text-xl font-bold text-white shadow-md'
                style={{
                  background:
                    'linear-gradient(135deg, var(--accent-primary, #2196f3) 0%, var(--accent-secondary, #1976d2) 100%)',
                }}
              >
                SA
              </div>

              {/* Logo Text */}
              <div className='flex flex-col'>
                <h2
                  className='text-lg leading-tight font-bold'
                  style={{ color: 'var(--text-primary, #333333)' }}
                >
                  ONG Ser Amor
                </h2>
                <p
                  className='text-xs'
                  style={{ color: 'var(--text-tertiary, #999999)' }}
                >
                  Portal
                </p>
              </div>
            </div>
          )}

          {/* Toggle Button */}
          <button
            onClick={toggleSidebar}
            className={`${collapsed ? 'left-1/2 -translate-x-1/2' : 'right-3'} absolute top-1/2 hidden -translate-y-1/2 rounded-lg p-2 md:block`}
            style={{
              transition: 'all 0.3s',
              background: 'var(--hover-bg, #f5f5f5)',
              color: 'var(--text-secondary, #666666)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--border-color, #f0f0f0)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--hover-bg, #f5f5f5)';
            }}
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
                      className={`flex w-full items-center justify-between ${collapsed ? 'justify-center' : ''} rounded-lg p-3 font-medium`}
                      style={{
                        transition: 'all 0.3s',
                        ...(isSubmenuActive(item.submenu)
                          ? {
                              background:
                                'linear-gradient(135deg, var(--accent-primary, #2196f3) 0%, var(--accent-secondary, #1976d2) 100%)',
                              color: '#ffffff',
                            }
                          : {
                              color: 'var(--text-secondary, #666666)',
                            }),
                      }}
                      onMouseEnter={(e) => {
                        if (!isSubmenuActive(item.submenu!)) {
                          e.currentTarget.style.background =
                            'var(--hover-bg, #f5f5f5)';
                          e.currentTarget.style.color =
                            'var(--text-primary, #333333)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSubmenuActive(item.submenu!)) {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color =
                            'var(--text-secondary, #666666)';
                        }
                      }}
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
                                className='flex items-center rounded-lg p-2'
                                style={{
                                  transition: 'all 0.3s',
                                  ...(isActive(subItem.path)
                                    ? {
                                        background:
                                          'linear-gradient(135deg, var(--accent-primary, #2196f3) 0%, var(--accent-secondary, #1976d2) 100%)',
                                        color: '#ffffff',
                                      }
                                    : {
                                        color: 'var(--text-secondary, #666666)',
                                      }),
                                }}
                                onMouseEnter={(e) => {
                                  if (!isActive(subItem.path)) {
                                    e.currentTarget.style.background =
                                      'var(--hover-bg, #f5f5f5)';
                                    e.currentTarget.style.color =
                                      'var(--text-primary, #333333)';
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (!isActive(subItem.path)) {
                                    e.currentTarget.style.background =
                                      'transparent';
                                    e.currentTarget.style.color =
                                      'var(--text-secondary, #666666)';
                                  }
                                }}
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
                      className={`mx-3 flex items-center ${collapsed ? 'justify-center' : ''} rounded-lg px-5 py-3.5 font-medium`}
                      style={{
                        transition: 'all 0.3s',
                        ...(isActive(item.path || '')
                          ? {
                              background:
                                'linear-gradient(135deg, var(--accent-primary, #2196f3) 0%, var(--accent-secondary, #1976d2) 100%)',
                              color: '#ffffff',
                            }
                          : {
                              color: 'var(--text-secondary, #666666)',
                            }),
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive(item.path || '')) {
                          e.currentTarget.style.background =
                            'var(--hover-bg, #f5f5f5)';
                          e.currentTarget.style.color =
                            'var(--text-primary, #333333)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive(item.path || '')) {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color =
                            'var(--text-secondary, #666666)';
                        }
                      }}
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
      </div>
    </>
  );
}
