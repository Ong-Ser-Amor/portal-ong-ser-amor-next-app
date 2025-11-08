'use client';

import { useEffect, useState } from 'react';

type Theme = 'theme-blue' | 'theme-default' | 'theme-purple' | 'theme-dark';

interface ThemeButton {
  value: Theme;
  label: string;
  gradient: string;
}

const themes: ThemeButton[] = [
  {
    value: 'theme-blue',
    label: 'Tema Azul',
    gradient: 'linear-gradient(135deg, #2196f3 0%, #1976d2 50%, #03a9f4 100%)',
  },
  {
    value: 'theme-default',
    label: 'Tema Padrão',
    gradient: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 50%, #cddc39 100%)',
  },
  {
    value: 'theme-purple',
    label: 'Tema Roxo',
    gradient: 'linear-gradient(135deg, #4a148c 0%, #7b1fa2 50%, #ab47bc 100%)',
  },
  {
    value: 'theme-dark',
    label: 'Tema Escuro',
    gradient: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #404040 100%)',
  },
];

export default function ThemeSelector() {
  const [currentTheme, setCurrentTheme] = useState<Theme>('theme-blue');

  // Carregar tema do localStorage na montagem
  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme') as Theme;
    if (savedTheme) {
      setCurrentTheme(savedTheme);
      document.body.className = savedTheme;
    } else {
      document.body.className = 'theme-blue';
    }
  }, []);

  const changeTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    document.body.className = theme;
    localStorage.setItem('app-theme', theme);
  };

  return (
    <div 
      className='flex items-center gap-2 rounded-lg px-3 py-2'
      style={{ background: 'var(--hover-bg, #f5f5f5)' }}
    >
      {/* Ícone de paleta */}
      <span className='text-xl'>🎨</span>

      {/* Botões de tema */}
      {themes.map((theme) => (
        <button
          key={theme.value}
          onClick={() => changeTheme(theme.value)}
          className={`h-8 w-8 rounded-lg border-2 transition-all hover:scale-110 ${
            currentTheme === theme.value
              ? 'ring-2 ring-offset-2 ring-blue-600'
              : ''
          }`}
          style={{
            background: theme.gradient,
            borderColor: currentTheme === theme.value 
              ? 'var(--accent-primary, #2196f3)' 
              : 'var(--border-color, #f0f0f0)',
            boxShadow: currentTheme === theme.value 
              ? '0 0 0 2px var(--bg-secondary, #ffffff), 0 0 0 4px var(--accent-primary, #2196f3)' 
              : 'none',
          }}
          title={theme.label}
        />
      ))}
    </div>
  );
}
