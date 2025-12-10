import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface MenuItemProps {
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  hasSubmenu?: boolean;
  className?: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  label,
  icon,
  href,
  onClick,
  active,
  disabled,
  hasSubmenu,
  className,
}) => {
  const Component = href ? 'a' : 'button';
  
  return (
    <Component
      href={href}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-2.5",
        "text-sm text-foreground",
        "rounded-lg transition-all duration-200",
        "hover:bg-accent/50",
        active && "bg-accent/50 text-primary",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {icon && (
        <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
          {icon}
        </span>
      )}
      <span className="flex-1 text-left">{label}</span>
      {hasSubmenu && (
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
      )}
    </Component>
  );
};
