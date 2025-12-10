import React from 'react';
import { cn } from '@/lib/utils';

interface MainMenuProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  children,
  title,
  className,
}) => {
  return (
    <nav
      className={cn(
        "w-64 p-4 rounded-xl",
        "bg-card/30 backdrop-blur-xl",
        "border border-border/30",
        "shadow-xl shadow-black/10",
        className
      )}
    >
      {title && (
        <h2 className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </h2>
      )}
      <div className="space-y-1">
        {children}
      </div>
    </nav>
  );
};
