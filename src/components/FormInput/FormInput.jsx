import React from "react";
import "./FormInput.css";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="form-input-wrapper">
      <label className="form-label">{label}</label>
      <input className="custom-input" {...otherProps} />
    </div>
  );
};

export default FormInput;
