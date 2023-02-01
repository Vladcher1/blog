import { Link } from "react-router-dom";
import { Input } from "../input/input";
import { SubmitButton } from "../submit-button/submit-button";
import "./sign-up-page.scss";
import { useDispatch } from "react-redux";
import { signUpUserSlice } from "../../user/userSlice";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export const SignUpPage = () => {
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const { username, email, password, repeatPassword } = data;
    console.log(data);
    if (password.trim() === repeatPassword.trim()) {
      dispatch(signUpUserSlice({ username, email, password }));
    }
    reset();
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

  return (
    <section className="sign-up">
      <h2 className="sign-up__title">Create new account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="sign-up__username">
          <Input
            label="username"
            register={register}
            required
            placeholder="some-username"
            inputType="text"
            minLength={3}
            maxLength={20}
            errors={errors}
          />
        </div>
        <div className="sign-up__email">
          <Input
            textLabel="email address"
            register={register}
            required
            label="email"
            placeholder={"email address"}
            inputType={"text"}
            minLength={3}
            maxLength={20}
            errors={errors}
            pattern={EMAIL_REGEXP}
          />
        </div>
        <div className="sign-up__password">
          <Input
            register={register}
            required
            label="password"
            placeholder={"password"}
            inputType={"text"}
            minLength={6}
            maxLength={40}
            errors={errors}
          />
        </div>
        <div className="sign-up__repeat-password">
          <Input
            textLabel="repeat password"
            label="repeatPassword"
            placeholder={"repeat password"}
            inputType={"text"}
            minLength={3}
            maxLength={20}
            register={register}
            required
            errors={errors}
          />
        </div>
        <div className="sign-up__agreement">
          <label className="sign-up__agreement-label">
            <input
              className="sign-up__agreement-input"
              type="checkbox"
              {...register("agree", {
                required: "Required area",
              })}
            />
            I agree to the processing of my personal information
          </label>
        </div>
        <SubmitButton button="Create" isValid={isValid} />
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
