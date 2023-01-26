import { Link } from "react-router-dom";
import "./sign-in-page.scss";
import { Input } from "../input/input";
import { SubmitButton } from "../submit-button/submit-button";

export const SignInPage = () => {
  return (
    <section className="sign-in">
      <h2 className="sign-in__title">Sign In</h2>
      <form>
        <div className="sign-in__login">
          <Input
            label={"Email address"}
            placeholder={"Email address"}
            inputType={"text"}
          />
        </div>
        <div className="sign-in__password">
          <Input
            label={"Password"}
            placeholder={"Password"}
            inputType={"text"}
          />
        </div>
        <SubmitButton button={"Login"} />
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
