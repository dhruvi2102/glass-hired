import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
  id?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onChange,
  label,
  disabled,
  error,
  className,
  id,
}) => {
  const checkboxId = id || `checkbox-${React.useId()}`;

  return (
    <div className={cn("space-y-1", className)}>
      <label
        htmlFor={checkboxId}
        className={cn(
          "flex items-center gap-3 cursor-pointer group",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <div className="relative">
          <input
            type="checkbox"
            id={checkboxId}
            checked={checked}
            onChange={(e) => onChange?.(e.target.checked)}
            disabled={disabled}
            className="sr-only peer"
          />
          <div className={cn(
            "w-5 h-5 rounded-md border-2 border-border/50",
            "bg-background/50 backdrop-blur-sm",
            "peer-checked:border-primary peer-checked:bg-primary",
            "peer-focus:ring-2 peer-focus:ring-primary/50",
            "transition-all duration-200",
            "group-hover:border-primary/70",
            "flex items-center justify-center"
          )}>
            <Check className={cn(
              "w-3 h-3 text-primary-foreground",
              "scale-0 peer-checked:scale-100",
              "transition-transform duration-200"
            )} />
          </div>
        </div>
        {label && (
          <span className="text-sm text-foreground">{label}</span>
        )}
      </label>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};
