import React from "react";
import "./Text.css";
type TextProps = {
  color?: "white" | "primary" | "secondary" | "info" | "success";
  fontSize?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  label: string | undefined
  icon?: React.ReactNode;
  fontWeight?: "bold" | "normal" | "extraBold" | "regular";
  title?:string
};

const Text: React.FC<TextProps> = ({
  color,
  fontSize,
  label,
  fontWeight,
  icon,
  title
}) => {
  return (
    <div
      className={`custom-text ${color} default-font ${fontSize} custom-fontWeight ${fontWeight}`}
    >
      {icon && <span className="icons">{icon}</span>}
      <p>{label}</p>
    </div>
  );
};

export default Text;
