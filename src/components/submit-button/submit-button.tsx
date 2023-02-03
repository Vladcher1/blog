import "./submit-button.scss";

export const SubmitButton = ({ button, isValid, buttonType='submit', styles, formName }: any) => {
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
