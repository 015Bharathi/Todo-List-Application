import React from "react";
import "../InputArea.css";
type InputFieldProps = {
  type: string;
  placeholder: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  variant?: "outlined" | "filled" | "standard";
  disabled?:boolean
  onFocus?: boolean
};

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  value,
  onChange,
  onKeyDown,
  variant,
}) => {
  return (
    <div>
      <input
        type={type}
        className={`custom-input ${variant}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default InputField;
