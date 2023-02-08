import { Link } from "react-router-dom";
import "./sign-in-page.scss";
import { Input } from "../input/input";
import { SubmitButton } from "../submit-button/submit-button";
import { useDispatch, useSelector } from "react-redux";
import { signInUserSlice } from "../../user/userSlice";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Alert } from "antd";
import { StateI } from "../app/App";

export const SignInPage: React.FC = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });
  const error = useSelector((state: any) => state.user.error);
  const status = useSelector((state: StateI) => state.user.status);
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

  const onSubmit: SubmitHandler<FieldValues> = (data: any) => {
    const { "email address": email, password } = data;
    dispatch(signInUserSlice({ email, password }));
    reset();
  };

  return (
    <section className="sign-in form-container shadow">
      <h2 className="sign-in__title form-container__title">Sign In</h2>
      <form id="sign-in" onSubmit={handleSubmit(onSubmit)}>
        <div className="sign-in__login">
          <Input
            textLabel="Email address"
            register={register}
            required
            label="email address"
            errors={errors}
            pattern={String(EMAIL_REGEXP)}
            placeholder={"Email address"}
            inputType={"text"}
          />
        </div>
        <div className="sign-in__password">
          <Input
            textLabel="Password"
            register={register}
            required
            label="password"
            errors={errors}
            minLength={6}
            maxLength={40}
            placeholder={"Password"}
            inputType={"text"}
          />
        </div>

        <span className="sign-in__sign-up-link">
          Don’t have an account?{" "}
          <Link to={"/sign-up"} className="sign-up-link">
            Sign Up.
          </Link>
        </span>
      </form>
      <SubmitButton formName="sign-in" button="Login" isValid={isValid} />
      {status === "rejected" && error["email or password"] && (
        <Alert
          style={{ marginBottom: "10px", marginTop: "10px" }}
          message={`Email or password ${error["email or password"]}`}
          type="error"
        />
      )}
      {status === "rejected" && !error["email or password"] && (
        <Alert
          style={{ marginBottom: "10px", marginTop: "10px" }}
          message={error.message}
          type="error"
        />
      )}
    </section>
  );
};
