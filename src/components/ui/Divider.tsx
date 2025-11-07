'use client';

import { useThemeObserver } from '@/hooks/useThemeObserver';

interface DividerProps {
  className?: string;
  spacing?: 'sm' | 'md' | 'lg';
}

const Divider: React.FC<DividerProps> = ({ 
  className = '', 
  spacing = 'md' 
}) => {
  useThemeObserver();

  // Define os espaçamentos baseado na prop
  const spacingClasses = {
    sm: 'my-4',
    md: 'my-6',
    lg: 'my-8',
  };

  return (
    <hr
      className={`border-0 border-t-2 ${spacingClasses[spacing]} ${className}`}
      style={{
        borderColor: 'var(--border-color, #f0f0f0)',
      }}
    />
  );
};

export default Divider;
