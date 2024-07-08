import React from "react";
import "./Button.css";
type ButtonProps = {
  onClick?: () => void;
  label?: React.ReactNode;
  variant?: "primary" | "secondary" | "error" | "outline" | "rounded";
  disabled?: boolean;
  icon?: React.ReactNode;
  type?:string
};

const Button: React.FC<ButtonProps> = ({
  onClick,      
  icon,
  label,
  variant,
  disabled
}) => {
  return (
    <button
      type="button"
      className={`custom-button ${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span>{icon}</span>}
      {label}
    </button>
  );
};

export default Button;
