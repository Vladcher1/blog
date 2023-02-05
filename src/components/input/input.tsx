import "./input.scss";

export interface InputProps {
  label: string;
  register: any;
  required?: boolean;
  maxLength?: number;
  placeholder?: string;
  minLength?: number;
  inputType: string;
  errors?: any;
  pattern?: string;
  defaultValue?: string;
  textLabel: string;
  classNames?: string;
  styles?: any;
}

export const Input: React.FC<InputProps> = ({
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
}: InputProps) => {
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
