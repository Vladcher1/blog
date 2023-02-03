import { Link } from "react-router-dom";
import "./sign-in-page.scss";
import { Input } from "../input/input";
import { SubmitButton } from "../submit-button/submit-button";
import { useDispatch, useSelector } from "react-redux";
import { signInUserSlice } from "../../user/userSlice";
import { useForm } from "react-hook-form";
import { ErrorNotification } from "../errorNotification/errorNotification";

export const SignInPage = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });
  const error = useSelector((state) => state.user.error);
  console.log(error);
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

  const onSubmit = (data) => {
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
            pattern={EMAIL_REGEXP}
            placeholder={"Email address"}
            inputType={"text"}
          />
          {errorObject?.password && (
            <div className="validation-error-container">
              <span className="validation-error">
                {`Password ${errorObject.password}`}
              </span>
            </div>
          )}
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
      {/* {error && <ErrorNotification error={error} />} */}
    </section>
  );
};
