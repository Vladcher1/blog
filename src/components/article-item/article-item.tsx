import React from "react";
import "./article-item.scss";
import "../../img/like.svg";
import { makeId } from "../../utilities";
// import { format } from 'date-fns'
import { Link } from "react-router-dom";

export const ArticleItem = ({
  title,
  description,
  tagList,
  date,
  body,
  favoritesCount,
}) => {
  const newId = makeId();
  const tagSpans = tagList.map((tag: any) => {
    return (
      <span className="article-item__tag" key={newId()}>
        {tag}
      </span>
    );
  });

  return (
    <article className="article-item">
      <header className="article-item__header">
        <Link to="articles/slug">
          <h5 className="article-item__title">{title} </h5>
        </Link>
        <button className="article-item__like-btn">
          <img src="./like.svg" alt="like" />
          <span className="article-item__like-btn-number">
            {favoritesCount}
          </span>
        </button>
        <div className="article-item__nickname">John Doe</div>
        <div className="article-item__icon">icon</div>
      </header>
      <div className="article-item__article-info">
        {tagSpans}
        <span className="article-item__date">{date} </span>
      </div>
      <p className="article-item__paragraph">{body}</p>
    </article>
  );
};
