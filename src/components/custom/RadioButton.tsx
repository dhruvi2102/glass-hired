import React from 'react';
import { cn } from '@/lib/utils';

interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface RadioButtonProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  orientation?: 'horizontal' | 'vertical';
  error?: string;
  className?: string;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  name,
  options,
  value,
  onChange,
  label,
  orientation = 'vertical',
  error,
  className,
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <div className={cn(
        "flex gap-4",
        orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'
      )}>
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              "flex items-center gap-3 cursor-pointer group",
              option.disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <div className="relative">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange?.(e.target.value)}
                disabled={option.disabled}
                className="sr-only peer"
              />
              <div className={cn(
                "w-5 h-5 rounded-full border-2 border-border/50",
                "bg-background/50 backdrop-blur-sm",
                "peer-checked:border-primary peer-checked:bg-primary/10",
                "peer-focus:ring-2 peer-focus:ring-primary/50",
                "transition-all duration-200",
                "group-hover:border-primary/70"
              )} />
              <div className={cn(
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                "w-2.5 h-2.5 rounded-full bg-primary",
                "scale-0 peer-checked:scale-100",
                "transition-transform duration-200"
              )} />
            </div>
            <span className="text-sm text-foreground">{option.label}</span>
          </label>
        ))}
      </div>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};
