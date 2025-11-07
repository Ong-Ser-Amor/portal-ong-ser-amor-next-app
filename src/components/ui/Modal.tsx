'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { useThemeObserver } from '@/hooks/useThemeObserver';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    footer?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    footer
}) => {
    const [isVisible, setIsVisible] = useState(false);
    useThemeObserver();

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            setTimeout(() => {
                setIsVisible(false);
            }, 200);
        }
    }, [isOpen]);

    if (!isOpen && !isVisible) return null;

    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl'
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
            style={{ background: 'rgba(0, 0, 0, 0.5)' }}
            onClick={handleBackdropClick}
        >
            <div 
                className={`w-full ${sizeClasses[size]} transform transition-transform duration-200 ${isOpen ? 'scale-100' : 'scale-95'}`}
                style={{
                    background: 'var(--bg-secondary)',
                    borderRadius: '15px',
                    padding: '30px',
                    maxHeight: '85vh',
                    overflowY: 'auto',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                }}
            >
                <div 
                    className="flex justify-between items-center mb-6 pb-4"
                    style={{ borderBottom: '2px solid var(--border-color)' }}
                >
                    <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="flex items-center justify-center transition-colors"
                        style={{
                            background: 'var(--hover-bg)',
                            width: '35px',
                            height: '35px',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--text-primary)',
                            fontSize: '20px',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--border-color)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'var(--hover-bg)';
                        }}
                    >
                        ×
                    </button>
                </div>

                <div className="mb-5">
                    {children}
                </div>

                {footer && (
                    <div className="flex justify-end gap-2.5 mt-5">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;