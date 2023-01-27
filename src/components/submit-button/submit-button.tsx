import "./submit-button.scss";

export const SubmitButton = ({ button, isValid }: any) => {
  return (
    <input
      type="submit"
      className="submit-button"
      value={button}
      disabled={!isValid}
    />
  );
};
