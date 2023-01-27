export const Input = ({
  label,
  register,
  required,
  maxLength,
  placeholder,
  minLength,
  inputType,
}: any) => (
  <label className="label">
    {label}
    <input
      {...register(label, {
        required: "Обязательное поле",
        minLength: {
          value: minLength,
          message: `Минимум ${minLength} символа`,
        },
        maxLength: {
          value: maxLength,
          message: `Максимально ${maxLength} символов`,
        },
      })}
      placeholder={placeholder}
      type={inputType}
    />
  </label>
);
