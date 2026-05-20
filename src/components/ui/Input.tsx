import { InputHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, fullWidth = true, ...props }, ref) => {
    return (
      <div className={clsx("flex flex-col gap-1", fullWidth && "w-full", className)}>
        {label && <label className="text-label-md text-on-surface-variant ml-1">{label}</label>}
        <input
          ref={ref}
          className={clsx(
            "bg-surface-container-low text-on-surface rounded-xl px-4 py-3 outline-none border transition-colors",
            "focus:border-primary focus:ring-1 focus:ring-primary",
            error ? "border-error focus:border-error focus:ring-error" : "border-transparent",
            "placeholder:text-on-surface-variant/60"
          )}
          {...props}
        />
        {error && <span className="text-label-sm text-error ml-1">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
