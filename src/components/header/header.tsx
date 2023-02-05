import "./header.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../../user/userSlice";

export const Header = () => {
  const userInfo = useSelector((state) => state.user);
  const dispatch = useDispatch();
  if (!userInfo.isLogged) {
    return (
      <header className="blog-header">
        <Link to={``} className="blog-header__logo">
          <h6>Realworld Blog</h6>
        </Link>
        <Link className="button sign-in-btn" to="/sign-in">
          Sign In
        </Link>
        <Link className="button sign-out-btn active" to="/sign-up">
          Sign Up
        </Link>
      </header>
    );
  }

  return (
    <header className="blog-header">
      <Link to={``} className="blog-header__logo">
        <h6>Realworld Blog</h6>
      </Link>
      <Link to="/new-article" className="create-article-link ">
        Create Article
      </Link>
      <div className="blog-header__user">
        <Link to="/profile">
          <span className="blog-header__user-username">
            {userInfo.user.username}
          </span>
        </Link>
        <img
          className="blog-header__profile-image"
          src={
            userInfo.user.image ??
            "https://api.realworld.io/images/smiley-cyrus.jpeg"
          }
          alt={userInfo.user.username}
        />
      </div>
      <Link
        className="button sign-out-btn active"
        to="/sign-in"
        onClick={() => {
          dispatch(logOut());
        }}
      >
        Log Out
      </Link>
    </header>
  );
};
