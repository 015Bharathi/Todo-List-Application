import React from "react";
type HeaderProps = {
  variant: "header" | "custom-font";
  label: React.ReactNode;
};
const Header: React.FC<HeaderProps> = ({ variant, label }) => {
  return <h1 className={variant}>{label}</h1>;
};

export default Header;
