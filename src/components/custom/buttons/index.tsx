import React from 'react';
import { cn } from '@/lib/utils';
import { Save, Send, X, RotateCcw, Loader2 } from 'lucide-react';

interface ButtonBaseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const baseButtonClass = cn(
  "inline-flex items-center justify-center gap-2",
  "px-4 py-2.5 rounded-lg font-medium text-sm",
  "transition-all duration-200",
  "disabled:opacity-50 disabled:cursor-not-allowed",
  "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background"
);

// Save Button
export const SaveButton: React.FC<ButtonBaseProps> = ({
  loading,
  icon,
  children,
  className,
  ...props
}) => (
  <button
    type="button"
    className={cn(
      baseButtonClass,
      "bg-secondary text-secondary-foreground",
      "hover:bg-secondary/80",
      "focus:ring-secondary/50",
      className
    )}
    disabled={loading}
    {...props}
  >
    {loading ? (
      <Loader2 className="w-4 h-4 animate-spin" />
    ) : (
      icon || <Save className="w-4 h-4" />
    )}
    {children}
  </button>
);

// Submit Button
export const SubmitButton: React.FC<ButtonBaseProps> = ({
  loading,
  icon,
  children,
  className,
  ...props
}) => (
  <button
    type="submit"
    className={cn(
      baseButtonClass,
      "bg-primary text-primary-foreground",
      "hover:bg-primary/90",
      "focus:ring-primary/50",
      "shadow-lg shadow-primary/25",
      className
    )}
    disabled={loading}
    {...props}
  >
    {loading ? (
      <Loader2 className="w-4 h-4 animate-spin" />
    ) : (
      icon || <Send className="w-4 h-4" />
    )}
    {children}
  </button>
);

// Cancel Button
export const CancelButton: React.FC<ButtonBaseProps> = ({
  loading,
  icon,
  children,
  className,
  ...props
}) => (
  <button
    type="button"
    className={cn(
      baseButtonClass,
      "bg-muted text-muted-foreground",
      "hover:bg-muted/80 hover:text-foreground",
      "focus:ring-muted/50",
      className
    )}
    disabled={loading}
    {...props}
  >
    {loading ? (
      <Loader2 className="w-4 h-4 animate-spin" />
    ) : (
      icon || <X className="w-4 h-4" />
    )}
    {children}
  </button>
);

// Reset Button
export const ResetButton: React.FC<ButtonBaseProps> = ({
  loading,
  icon,
  children,
  className,
  ...props
}) => (
  <button
    type="reset"
    className={cn(
      baseButtonClass,
      "bg-background/50 backdrop-blur-sm",
      "border border-border/50",
      "text-foreground",
      "hover:bg-accent/50 hover:border-primary/50",
      "focus:ring-accent/50",
      className
    )}
    disabled={loading}
    {...props}
  >
    {loading ? (
      <Loader2 className="w-4 h-4 animate-spin" />
    ) : (
      icon || <RotateCcw className="w-4 h-4" />
    )}
    {children}
  </button>
);

// Button Group for consistent spacing
interface ButtonGroupProps {
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  align = 'right',
  className,
}) => (
  <div
    className={cn(
      "flex flex-wrap gap-3 pt-4",
      align === 'left' && 'justify-start',
      align === 'center' && 'justify-center',
      align === 'right' && 'justify-end',
      className
    )}
  >
    {children}
  </div>
);
