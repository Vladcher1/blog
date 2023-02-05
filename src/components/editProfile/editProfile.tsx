import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../user/userSlice";
import { ErrorNotification } from "../errorNotification/errorNotification";
import { Input } from "../input/input";
import { SubmitButton } from "../submit-button/submit-button";
import "./editProfile.scss";

export const EditProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const error = useSelector((state) => state.user.error);

  const onSubmit = (data) => {
    const { image, email, password, username } = data;

    const newImage = image.trim();
    const newEmail = String(email).trim();
    const newPassword = String(password).trim();
    const newUsername = username.trim();

    const needToUpdate =
      newEmail !== user.user.email ||
      newImage !== user.user.image ||
      newPassword !== user.user.password ||
      newUsername !== user.user.username;

    if (needToUpdate) {
      dispatch(updateUser({ newEmail, newImage, newPassword, newUsername }));
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

  const URL_REGEXP =
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

  return (
    <section className="sign-up shadow form-container">
      <h2 className=" form-container__title ">Edit profile</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="sign-up__username">
          <Input
            textLabel="Username"
            required={true}
            label="username"
            register={register}
            placeholder="some-username"
            inputType="text"
            defaultValue={user.user.username}
            minLength={3}
            maxLength={20}
            errors={errors}
          />
        </div>
        <div className="sign-up__email">
          <Input
            required={true}
            register={register}
            defaultValue={user.user.email}
            textLabel="Email address"
            label="email"
            placeholder={"email address"}
            inputType={"text"}
            // minLength={3}
            // maxLength={20}
            errors={errors}
            pattern={EMAIL_REGEXP}
          />
        </div>
        <div className="sign-up__password">
          <Input
            textLabel="New password"
            required={true}
            register={register}
            label="password"
            placeholder={"new password"}
            inputType={"text"}
            minLength={6}
            maxLength={40}
            errors={errors}
          />
        </div>
        <div className="form edit-profile__image">
          <Input
            required={true}
            textLabel="Avatar image (url)"
            label="image"
            placeholder={"avatar image"}
            defaultValue={user.user.image}
            inputType={"text"}
            minLength={3}
            maxLength={Infinity}
            register={register}
            errors={errors}
            pattern={URL_REGEXP}
          />
        </div>
        <SubmitButton button="Save" isValid={isValid} />
      </form>
      {error && <ErrorNotification error={error} />}
    </section>
  );
};
