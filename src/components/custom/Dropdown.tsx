import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Check } from "lucide-react";
// import { CustomTooltip } from "@/components/common/CustomTooltip";

interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface CustomDropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  id?: string;

  // Tooltip like your Button + Checkbox
  tooltipMessage?: string;
  tooltipPlacement?: "top" | "right" | "left" | "bottom";
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  error,
  disabled = false,
  className,
  id,
  tooltipMessage,
  tooltipPlacement = "top",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);
  const dropdownId = React.useId();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (ev: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(ev.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dropdownContent = (
    <div className={cn("space-y-2", className)} ref={dropdownRef}>
      {label && (
        <label
          htmlFor={dropdownId}
          className="block text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {/* Trigger */}
        <button
          id={dropdownId}
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={cn(
            "w-full px-4 py-2.5 rounded-lg",
            "bg-background/50 backdrop-blur-sm",
            "border border-border/50",
            "text-left flex items-center justify-between",
            "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
            "transition-all duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-destructive",
            selectedOption ? "text-foreground" : "text-muted-foreground"
          )}
        >
          <span>{selectedOption?.label || placeholder}</span>
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {/* Dropdown panel */}
        {isOpen && (
          <div
            className={cn(
              "absolute z-50 w-full mt-1 rounded-lg",
              "bg-popover backdrop-blur-xl",
              "border border-border/50",
              "shadow-lg shadow-black/20",
              "max-h-60 overflow-auto animate-in fade-in-0 zoom-in-95"
            )}
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                disabled={option.disabled}
                onClick={() => {
                  if (!option.disabled) {
                    onChange?.(option.value);
                    setIsOpen(false);
                  }
                }}
                className={cn(
                  "w-full px-4 py-2.5 text-left",
                  "flex items-center justify-between",
                  "hover:bg-accent/50 transition-colors",
                  "text-foreground",
                  option.disabled && "opacity-50 cursor-not-allowed",
                  value === option.value && "bg-accent/30"
                )}
              >
                <span>{option.label}</span>
                {value === option.value && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );

  return dropdownContent;
};
