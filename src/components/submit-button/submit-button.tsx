import "./submit-button.scss";

export const SubmitButton = ({ button, onSubmit }: any) => {
  return <input type="submit" className="submit-button" value={button} />;
};
