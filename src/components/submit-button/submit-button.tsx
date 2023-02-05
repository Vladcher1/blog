import "./submit-button.scss";

export interface SubmitButtonProps {
  button?: string;
  isValid?: boolean;
  buttonType?: string;
  styles?: any;
  formName?: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  button,
  isValid,
  buttonType = "submit",
  styles,
  formName,
}) => {
  return (
    <input
      form={formName}
      style={styles}
      type={buttonType}
      className="submit-button"
      value={button}
      disabled={!isValid}
    />
  );
};
