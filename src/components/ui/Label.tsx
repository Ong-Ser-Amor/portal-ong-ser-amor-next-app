'use client';

import { useThemeObserver } from '@/hooks/useThemeObserver';

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}

const Label = ({ htmlFor, children, className = '' }: LabelProps) => {
  const { isDark } = useThemeObserver();

  return (
    <label
      htmlFor={htmlFor}
      className={`block font-medium ${className}`}
      style={{
        marginBottom: '8px',
        color: isDark ? '#f5f5f5' : '#333',
        fontWeight: 500,
        fontSize: '16px',
      }}
    >
      {children}
    </label>
  );
};

export default Label;
