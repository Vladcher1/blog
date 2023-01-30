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
}: any) => {
  
  const inputErrorStyle = errors[label] && {
    borderColor: "#F5222D",
  };

  return (
    <label className="label">
      {label[0].toUpperCase() + label.slice(1)}
      <input
        style={inputErrorStyle}
        className="input"
        {...register(label, {
          required: `${label} is required`,
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
