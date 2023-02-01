import { Link, Navigate } from "react-router-dom";
import "./sign-in-page.scss";
import { Input } from "../input/input";
import { SubmitButton } from "../submit-button/submit-button";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { signInUserSlice } from "../../user/userSlice";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { ErrorNotification } from "../errorNotification/errorNotification";

export const SignInPage = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

  const onSubmit = (data) => {
    const { ["email address"]: email, password } = data;
    dispatch(signInUserSlice({ email, password }));
    reset();
  };

  return (
    <section className="sign-in">
      <h2 className="sign-in__title">Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="sign-in__login">
          <Input
            register={register}
            required
            label="email address"
            errors={errors}
            pattern={EMAIL_REGEXP}
            placeholder={"Email address"}
            inputType={"text"}
          />
        </div>
        <div className="sign-in__password">
          <Input
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
        <SubmitButton button="Login" isValid={isValid} />

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
