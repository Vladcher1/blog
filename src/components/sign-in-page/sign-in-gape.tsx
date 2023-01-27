import { Link } from "react-router-dom";
import "./sign-in-page.scss";
import { Input } from "../input/input";
import { SubmitButton } from "../submit-button/submit-button";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { signInUserSlice } from "../../user/signInSlice";

export const SignInPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const inputChange = (text, input) => {
    if (input === "Email address") {
      setEmail(text);
    }
    if (input === "Password") {
      setPassword(text);
    }
  };

  const onSubmit = () => {
    console.log(email, password);
    dispatch(signInUserSlice({ email, password }));
    setEmail("");
    setPassword("");
  };

  return (
    <section className="sign-in">
      <h2 className="sign-in__title">Sign In</h2>
      <form>
        <div className="sign-in__login">
          <Input
            label={"Email address"}
            placeholder={"Email address"}
            inputType={"text"}
            inputChange={inputChange}
          />
        </div>
        <div className="sign-in__password">
          <Input
            label={"Password"}
            placeholder={"Password"}
            inputType={"text"}
            inputChange={inputChange}
          />
        </div>
        <SubmitButton button={"Login"} onSubmit={onSubmit} />
        <span className="sign-in__sign-up-link">
          Don’t have an account?{" "}
          <Link to={"/sign-up"} className="sign-up-link">
            Sign Up.
          </Link>
        </span>
      </form>
    </section>
  );
};
