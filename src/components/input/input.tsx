import "./input.scss";

export const Input = ({
  label,
  register,
  required,
  maxLength,
  placeholder,
  minLength,
  inputType,
  errors,
  pattern,
  defaultValue,
  textLabel
}: any) => {
  const inputErrorStyle = errors[label] && {
    borderColor: "#F5222D",
  };

  return (
    <label className="label">
      {textLabel}
      <input
        style={inputErrorStyle}
        defaultValue={defaultValue}
        className="input"
        {...register(label, {
          required: {
            value: required,
            message: `${label} is required`,
          },
          minLength: {
            value: minLength,
            message: `Your ${label} needs to be at least ${minLength} characters.`,
          },
          maxLength: {
            value: maxLength,
            message: `Your ${label} needs to be no more than ${maxLength} characters.`,
          },
          pattern: {
            value: pattern,
            message: `Your email is incorrect`,
          },
        })}
        placeholder={placeholder}
        type={inputType}
      />
      <div className="validation-error-container">
        {errors[label] && (
          <span className="validation-error">
            {errors[label]?.message || "Error!"}
          </span>
        )}
      </div>
    </label>
  );
};
