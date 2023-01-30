import "./header.scss";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import React, { useEffect } from "react";

export const Header = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const userInfo = useSelector((state) => state.users);
  // const isLogged = useSelector((state) => state.isLogged);

  const { page } = useParams();

  useEffect(() => {
    console.log(userInfo, "userInfo");
  }, [userInfo]);

  if (userInfo.isLogged) {
    return (
      <header className="blog-header">
        <Link to={``} className="blog-header__logo">
          <h6>Realworld Blog</h6>
        </Link>
        <Link to="" className="create-article-link ">
          Create Article
        </Link>
        <div className="blog-header__user">
          <span className="blog-header__user-username">
            {userInfo.user.username}
          </span>
          <img
            className="blog-header__profile-image"
            src={userInfo.user.image}
          />
        </div>
        <Link className="button sign-out-btn active" to="/sign-up">
          Log Out
        </Link>
      </header>
    );
  }

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
};
