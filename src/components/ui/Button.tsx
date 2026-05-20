import { ButtonHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'error';
  icon?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'filled', color = 'primary', icon, children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-label-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
      filled: {
        primary: "bg-primary text-on-primary hover:bg-primary/90 shadow-sm hover:shadow",
        secondary: "bg-secondary text-on-secondary hover:bg-secondary/90 shadow-sm hover:shadow",
        error: "bg-error text-on-error hover:bg-error/90 shadow-sm hover:shadow",
      },
      outlined: {
        primary: "border border-outline text-primary hover:bg-primary/10",
        secondary: "border border-outline text-secondary hover:bg-secondary/10",
        error: "border border-error text-error hover:bg-error/10",
      },
      text: {
        primary: "text-primary hover:bg-primary/10 px-4",
        secondary: "text-secondary hover:bg-secondary/10 px-4",
        error: "text-error hover:bg-error/10 px-4",
      }
    };

    return (
      <button
        ref={ref}
        className={clsx(baseStyles, variants[variant][color], className)}
        {...props}
      >
        {icon && <span className="material-symbols-outlined text-lg">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
