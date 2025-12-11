import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
// import { CustomTooltip } from "@/components/common/CustomTooltip";

export interface CustomCheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
  id?: string;
  tooltipMessage?: string;
  tooltipPlacement?: "top" | "right" | "left" | "bottom";
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked = false,
  onChange,
  label,
  disabled = false,
  error,
  className,
  id,
  tooltipMessage,
  tooltipPlacement = "top",
}) => {
  const generatedId = React.useId();
  const checkboxId = id || `checkbox-${generatedId}`;

  const checkboxBox = (
    <div className={cn("space-y-1", className)}>
      <label
        htmlFor={checkboxId}
        className={cn(
          "flex items-center gap-3 cursor-pointer group",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <div className="relative">
          {/* Hidden input */}
          <input
            type="checkbox"
            id={checkboxId}
            className="sr-only peer"
            checked={checked}
            onChange={(e) => onChange?.(e.target.checked)}
            disabled={disabled}
          />

          {/* Custom UI */}
          <div
            className={cn(
              "w-5 h-5 rounded-md border-2 border-border/50",
              "bg-background/50 backdrop-blur-sm",
              "peer-checked:border-primary peer-checked:bg-primary",
              "peer-focus:ring-2 peer-focus:ring-primary/30",
              "transition-all duration-200",
              "group-hover:border-primary/70",
              "flex items-center justify-center"
            )}
          >
            <Check
              className={cn(
                "w-3 h-3 text-primary-foreground",
                "scale-0 peer-checked:scale-100",
                "transition-transform duration-200"
              )}
            />
          </div>
        </div>

        {label && <span className="text-sm text-foreground">{label}</span>}
      </label>

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );

  // Add tooltip wrapper (same structure as custom button)
  return checkboxBox;
};
