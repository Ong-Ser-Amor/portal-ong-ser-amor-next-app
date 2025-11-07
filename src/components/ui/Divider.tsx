'use client';

import { useEffect, useState } from 'react';

interface DividerProps {
  className?: string;
  spacing?: 'sm' | 'md' | 'lg';
}

const Divider: React.FC<DividerProps> = ({ 
  className = '', 
  spacing = 'md' 
}) => {
  // Estado para forçar re-renderização quando o tema mudar
  const [, setThemeVersion] = useState(0);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setThemeVersion((v) => v + 1);
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

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
