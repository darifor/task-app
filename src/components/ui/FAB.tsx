import clsx from 'clsx';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface FABProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  label?: string;
  color?: 'primary' | 'secondary' | 'tertiary';
}

export const FAB = forwardRef<HTMLButtonElement, FABProps>(
  ({ className, icon, label, color = 'primary', ...props }, ref) => {
    const baseStyles = "fixed bottom-24 right-4 md:bottom-8 md:right-8 z-50 flex items-center justify-center rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95";
    
    const colors = {
      primary: "bg-primary text-on-primary hover:bg-primary/90",
      secondary: "bg-secondary text-on-secondary hover:bg-secondary/90",
      tertiary: "bg-tertiary text-on-tertiary hover:bg-tertiary/90",
    };

    return (
      <button
        ref={ref}
        className={clsx(
          baseStyles,
          colors[color],
          label ? "px-5 py-4 gap-2" : "w-14 h-14",
          className
        )}
        {...props}
      >
        <span className="material-symbols-outlined text-[24px]">{icon}</span>
        {label && <span className="font-label-lg">{label}</span>}
      </button>
    );
  }
);

FAB.displayName = 'FAB';
