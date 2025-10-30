'use client';

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}

const Label = ({ htmlFor, children, className = '' }: LabelProps) => {
  // Remova o espaço extra no final da string de classe
  const baseClass = 'block text-sm font-medium text-gray-700 mb-1';
  const combinedClass = className ? `${baseClass} ${className}` : baseClass;

  return (
    <label htmlFor={htmlFor} className={combinedClass}>
      {children}
    </label>
  );
};

export default Label;
