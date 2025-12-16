import React from "react";
import { CustomButton, CustomButtonProps } from "./Button";
import { Save, Send, X, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export const SaveButton: React.FC<Omit<CustomButtonProps, "icon">> = (props) => (
  <CustomButton icon={<Save className="w-4 h-4" />} {...props}>
    {props.children || "Save"}
  </CustomButton>
);

export const SubmitButton: React.FC<Omit<CustomButtonProps, "icon">> = (props) => (
  <CustomButton icon={<Send className="w-4 h-4" />} {...props}>
    {props.children || "Submit"}
  </CustomButton>
);

export const CancelButton: React.FC<Omit<CustomButtonProps, "icon" | "variant">> = (props) => (
  <CustomButton icon={<X className="w-4 h-4" />} variant="outline" {...props}>
    {props.children || "Cancel"}
  </CustomButton>
);

export const ResetButton: React.FC<Omit<CustomButtonProps, "icon" | "variant">> = (props) => (
  <CustomButton icon={<RotateCcw className="w-4 h-4" />} variant="secondary" {...props}>
    {props.children || "Reset"}
  </CustomButton>
);

interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ children, className }) => (
  <div className={cn("flex items-center gap-2", className)}>{children}</div>
);
