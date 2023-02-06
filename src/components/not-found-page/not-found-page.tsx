import React from "react";
import { Link } from "react-router-dom";
import "./notFoundPage.scss";
import "../../img/Beach-Vacation.png";
export const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-page__container">
      <h2 className="not-found-page__second-title">Whoops</h2>
      <h1 className="not-found-page__main-title">Page not found</h1>
      <img
        className="not-found-page__image"
        src="/Beach-Vacation.png"
        alt="dog is on holiday"
      />
      <p className="not-found-page__text">
        Looks like this page went on vacation
      </p>
      <span className="not-found-page__link-span">
        Try our{" "}
        <Link className="not-found-page__link" to="/articles">
          blog
        </Link>{" "}
        instead
      </span>
    </div>
  );
};
