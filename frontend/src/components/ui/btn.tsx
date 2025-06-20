import clsx from 'clsx';
import React from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
}

const Btn: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center font-medium rounded-xl transition-colors duration-200 focus:outline-none';

  const variants: Record<Variant, string> = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    secondary: 'bg-gray-900 text-white hover:bg-gray-800',
    outline: 'border border-indigo-600 text-indigo-600 hover:bg-indigo-50',
    ghost: 'text-gray-800 hover:bg-gray-100',
  };

  const sizes: Record<Size, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      {...props}
      className={clsx(base, variants[variant], sizes[size], className)}
    >
      {children}
    </button>
  );
};

export default Btn;
