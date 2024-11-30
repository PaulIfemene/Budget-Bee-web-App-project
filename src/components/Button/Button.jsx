import React from "react";
import "./Button.css";

const Button = ({ children, onClick, disabled, blue, ...otherProps }) => {
  return (
    <button
      className={blue ? "btn btn-blue" : "btn"}
      onClick={onClick}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
