import "./submit-button.scss";

export const SubmitButton = ({ button, isValid, buttonType='submit', styles }: any) => {
  return (
    <input
      style={styles}
      type={buttonType}
      className="submit-button"
      value={button}
      disabled={!isValid}
    />
  );
};
