import React from "react";
import { Button as ShadButton } from "@/components/ui/button";
// import { CustomTooltip } from "@/components/common/CustomTooltip";

export interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  tooltipMessage?: string;
  tooltipPlacement?: "top" | "right" | "left" | "bottom";
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  loading?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  icon,
  // tooltipMessage,
  // tooltipPlacement = "top",
  variant = "default",
  size = "default",
  loading = false,
  disabled,
  ...props
}) => {
  const content = (
    <ShadButton
      variant={variant}
      size={size}
      disabled={disabled || loading}
      {...props}
      className="flex items-center gap-2"
    >
      {loading ? (
        <span className="animate-spin border-2 border-t-transparent rounded-full w-4 h-4" />
      ) : (
        icon
      )}
      {children}
    </ShadButton>
  );

  return content;
};
