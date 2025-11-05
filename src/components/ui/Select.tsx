import React, { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

interface Option {
    value: string | number;
    label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    id: string;
    label: string;
    options: Option[];
    error?: FieldError;
    labelHidden?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ id, label, options, error, labelHidden = false, ...rest }, ref) => {
        return (
            <div className="mb-2">
                {!labelHidden && (
                    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                    </label>
                )}<select
                    id={id}
                    ref={ref}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800 ${
                        error ? 'border-red-500' : 'border-gray-300'
                    } ${
                        rest.disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white'
                    }`}
                    {...rest}
                >
                    <option value="">Selecione uma opção</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {error && (
                    <p className="mt-1 text-sm text-red-600">{error.message}</p>
                )}
            </div>
        );
    }
);

Select.displayName = 'Select';

export default Select;