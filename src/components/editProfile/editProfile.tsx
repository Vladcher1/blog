import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../user/userSlice";
import { Input } from "../input/input";
import { SubmitButton } from "../submit-button/submit-button";
import "./editProfile.scss";

export const EditProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const onSubmit = (data) => {
    const { image, email, password, username } = data;

    const newImage = image.trim();
    const newEmail = String(email).trim();
    const newPassword = String(password).trim();
    const newUsername = username.trim();

    console.log(newEmail, email);
    const needToUpdate =
      (newEmail !== user.user.email && newEmail !== "") ||
      (newImage !== user.user.image && newImage !== "") ||
      (newPassword !== user.user.password && newPassword !== "") ||
      (newUsername !== user.user.username && newUsername !== "");

    if (needToUpdate) {
      console.log(newEmail, newImage, newPassword, newUsername);
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
    <section className="sign-up">
      <h2 className="sign-up__title">Edit profile</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="sign-up__username">
          <Input
            textLabel="Username"
            required={false}
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
            required={false}
            register={register}
            defaultValue={user.user.email}
            textLabel="Email address"
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
            required={false}
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
    </section>
  );
};
