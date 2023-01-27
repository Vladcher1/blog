import { Link } from "react-router-dom";
import { Input } from "../input/input";
import { SubmitButton } from "../submit-button/submit-button";
import "./sign-up-page.scss";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signUp, signUpUserSlice } from "../../user/signUpSlice";
import { useForm } from "react-hook-form";

export const SignUpPage = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();
  const [agree, setAgree] = useState(false);

  // const inputChange = (text, input) => {
  //   if (input === "username") {
  //     setUsername(text);
  //   }
  //   if (input === "email address") {
  //     setEmail(text);
  //   }
  //   if (input === "password") {
  //     setPassword(text);
  //   }
  //   if (input === "repeat password") {
  //     setRepeatPassword(text);
  //   }
  // };

  const onSubmit = (data) => {
    const {
      username,
      email,
      password,
      ["repeat password"]: repeatPassword,
    } = data;
    console.log(password, repeatPassword);
    if (password.trim() === repeatPassword.trim()) {
      dispatch(signUpUserSlice({ username, email, password }));
      console.log("задиспатчено");
    }
    console.log(data);
    reset();
    // console.log(username, email, password, repeatPassword);
    // setUsername("");
    // setEmail("");
    // setPassword("");
    // setRepeatPassword("");
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
            register={register}
            required
            label="email address"
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
            label="repeat password"
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
            <input type="checkbox" />I agree to the processing of my personal
            information
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
