import React from "react";
import "./input.scss";
export const Input = ({
  inputType,
  classes = "",
  placeholder,
  label,
  inputChange,
}: any) => {
  let classNames = "input" + classes;

  const handleChange = (event) => {
    inputChange(event.target.value, label);
  };
  return (
    <React.Fragment>
      <span className="label">{label}</span>
      <input
        type={inputType}
        className={classNames}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </React.Fragment>
  );
};
