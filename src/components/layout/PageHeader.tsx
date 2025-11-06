import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  breadcrumb?: string;
  children?: ReactNode;
}

export default function PageHeader({ title, breadcrumb, children }: PageHeaderProps) {
  return (
    <div
      className='mb-6 flex items-center justify-between gap-5 rounded-[15px]'
      style={{
        padding: '25px 30px',
        background: 'var(--bg-secondary, #ffffff)',
        boxShadow: '0 2px 8px var(--card-shadow, rgba(0, 0, 0, 0.05))',
      }}
    >
      <div className='flex-1'>
        <h1 
          className='text-[28px] font-bold leading-tight'
          style={{ color: 'var(--text-primary, #333333)' }}
        >
          {title}
        </h1>
        {breadcrumb && (
          <div 
            className='mt-1 text-sm'
            style={{ color: 'var(--text-tertiary, #999999)' }}
          >
            {breadcrumb}
          </div>
        )}
      </div>

      {children && (
        <div className='flex items-center gap-4'>
          {children}
        </div>
      )}
    </div>
  );
}
