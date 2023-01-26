import "./submit-button.scss";

export const SubmitButton = ({ button, onSubmit }: any) => {
  return (
    <button type="button" className="submit-button" onClick={() => onSubmit()}>
      {button}
    </button>
  );
};
