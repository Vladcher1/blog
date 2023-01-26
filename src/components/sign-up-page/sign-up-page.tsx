import { Link } from "react-router-dom";
import { Input } from "../input/input";
import { SubmitButton } from "../submit-button/submit-button";
import "./sign-up-page.scss";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signUp, signUpUserSlice } from "../../user/signUpSlice";

export const SignUpPage = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();
  const [agree, setAgree] = useState(false);

  const inputChange = (text, input) => {
    if (input === "Username") {
      setUsername(text);
    }
    if (input === "Email address") {
      setEmail(text);
    }
    if (input === "Password") {
      setPassword(text);
    }
    if (input === "Repeat password") {
      setRepeatPassword(text);
    }
  };

  const onSubmit = () => {
    console.log(username, email, password, repeatPassword);
    dispatch(signUpUserSlice({ username, email, password }));
  };
  return (
    <section className="sign-up">
      <h2 className="sign-up__title">Create new account</h2>
      <form>
        <div className="sign-up__username">
          <Input
            label={"Username"}
            placeholder={"some-username"}
            inputType={"text"}
            inputChange={inputChange}
          />
        </div>
        <div className="sign-up__email">
          <Input
            label={"Email address"}
            placeholder={"Email address"}
            inputType={"text"}
            inputChange={inputChange}
          />
        </div>
        <div className="sign-up__password">
          <Input
            label={"Password"}
            placeholder={"Password"}
            inputType={"text"}
            inputChange={inputChange}
          />
        </div>
        <div className="sign-up__repeat-password">
          <Input
            label={"Repeat password"}
            placeholder={"Repeat password"}
            inputType={"text"}
            inputChange={inputChange}
          />
        </div>
        <div className="sign-up__agreement">
          <label className="sign-up__agreement-label">
            <input type="checkbox" />I agree to the processing of my personal
            information
          </label>
        </div>
        <SubmitButton button={"Create"} onSubmit={onSubmit} />
        <span className="sign-up__sign-in-link">
          Already have an account?{" "}
          <Link to={"/sign-in"} className="sign-up-link">
            Sign In.
          </Link>
        </span>
      </form>
    </section>
  );
};
