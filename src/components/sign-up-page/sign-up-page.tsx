import { Link } from "react-router-dom";
import { Input } from "../input/input";
import { SubmitButton } from "../submit-button/submit-button";
import "./sign-up-page.scss";
import { useDispatch } from "react-redux";
import { signUp } from "../../user/userSlice";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { ErrorNotification } from "../errorNotification/errorNotification";

export type isErrorType = boolean;

export const SignUpPage: React.FC = () => {
  const dispatch = useDispatch();
  const [isError, setIsError] = useState<isErrorType>(false);
  const [error, setError]: any = useState({});

  const signUpFetch: any = async (username: any, email: any, password: any) => {
    try {
      setIsError(false);

      const { data } = await axios.post(
        `https://blog.kata.academy/apis/users`,
        {
          user: {
            username,
            email,
            password,
          },
        }
      );
      dispatch(signUp({ payload: data }));
      return data;
    } catch (error: any) {
      setIsError(true);
      if (error.response) {
        setError(error.response.data.errors);
        throw new Error("client received an error response (5xx, 4xx)");
      } else if (error.request) {
        setError(error.data.errors);
        throw new Error(
          "client never received a response, or request never left"
        );
      } else {
        throw new Error("unexpected error, ", error);
      }
    }
  };

  const onSubmit = ({ username, email, password, repeatPassword }: any) => {
    if (password.trim() === repeatPassword.trim()) {
      signUpFetch(username, email, password);
      reset();
    }
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
    <section className="sign-up form-container shadow">
      <h2 className="sign-up__title form-container__title">
        Create new account
      </h2>
      <form id="sign-up" onSubmit={handleSubmit(onSubmit)}>
        <div className="sign-up__username">
          <Input
            textLabel="Username"
            label="username"
            register={register}
            required
            placeholder="some-username"
            inputType="text"
            minLength={3}
            maxLength={20}
            errors={errors}
          />
          <div className="validation-error-container">
            {error.username && (
              <span className="validation-error">{`Email ${error.username}`}</span>
            )}
          </div>
        </div>
        <div className="sign-up__email">
          <Input
            textLabel="Email address"
            register={register}
            required
            label="email"
            placeholder={"email address"}
            inputType={"text"}
            minLength={3}
            maxLength={20}
            errors={errors}
            pattern={String(EMAIL_REGEXP)}
          />
          {error.email && (
            <span className="validation-error">{`Email ${error.email}`}</span>
          )}
        </div>
        <div className="sign-up__password">
          <Input
            textLabel="Password"
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
            textLabel="Repeat password"
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
        <SubmitButton formName="sign-up" button="Create" isValid={isValid} />
        <span className="sign-up__sign-in-link">
          Already have an account?{" "}
          <Link to={"/sign-in"} className="sign-up-link">
            Sign In.
          </Link>
        </span>
      </form>
      {isError && !error.email && !error.username && (
        <ErrorNotification error={error} />
      )}
    </section>
  );
};
