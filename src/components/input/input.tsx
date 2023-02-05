
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
  textLabel,
  classNames,
  styles,
}: any) => {
  // const inputErrorStyle = errors[label] && {
  //   borderColor: "#F5222D",
  // };

  // const error = useSelector((state) => state.user.error);

  return (
    <label className="label" style={styles}>
      {textLabel}
      <input
        defaultValue={defaultValue}
        className={"input " + classNames}
        {...register(label, {
          required: {
            value: required,
            message: `${textLabel} is required`,
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
