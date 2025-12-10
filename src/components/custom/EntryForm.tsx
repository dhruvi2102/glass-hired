import React from 'react';
import { cn } from '@/lib/utils';

interface EntryFormProps {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  title?: string;
  description?: string;
  className?: string;
}

export const EntryForm: React.FC<EntryFormProps> = ({
  children,
  onSubmit,
  title,
  description,
  className,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "p-6 rounded-xl",
        "bg-card/30 backdrop-blur-xl",
        "border border-border/30",
        "shadow-xl shadow-black/10",
        "space-y-6",
        className
      )}
    >
      {(title || description) && (
        <div className="space-y-2 pb-4 border-b border-border/30">
          {title && (
            <h2 className="text-xl font-semibold text-foreground">{title}</h2>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </form>
  );
};
