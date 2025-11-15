import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'solid' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, disabled, ...props }, ref) => {
    // Base styles - consistent across all variants
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-semibold transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50';

    // Size variants
    const sizeStyles = {
      sm: 'px-4 py-2 text-xs',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
    };

    // Variant styles
    const variantStyles = {
      primary: 'bg-[var(--primary)] text-black shadow hover:bg-[var(--primary-dark)] disabled:bg-[var(--light-600)] disabled:text-[var(--dark-400)]',
      secondary: 'bg-[var(--light-800)] text-[var(--dark-800)] hover:bg-[var(--primary-alpha)] disabled:bg-[var(--light-600)] disabled:text-[var(--dark-400)]',
      solid: 'bg-[var(--light-800)] text-[var(--dark-800)] shadow hover:bg-[var(--primary-alpha)] dark:bg-[var(--light-800)] dark:text-[var(--dark-800)] dark:hover:bg-[var(--primary-alpha)] disabled:bg-[var(--light-600)] disabled:text-[var(--dark-400)]',
      outline: 'bg-transparent text-[var(--foreground)] border border-[var(--light-400)] hover:bg-[var(--light-400)] dark:border-[var(--dark-400)] dark:hover:bg-[var(--dark-600)] disabled:bg-transparent disabled:text-[var(--dark-400)]',
      ghost: 'bg-transparent text-[var(--dark-600)] hover:bg-[var(--light-600)] hover:text-[var(--foreground)] dark:text-[var(--dark-400)] dark:hover:bg-[var(--light-600)] dark:hover:text-[var(--light)] disabled:bg-transparent disabled:text-[var(--dark-400)]',
    };

    // Combine all styles
    const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

    return (
      <button
        ref={ref}
        className={combinedClassName}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
