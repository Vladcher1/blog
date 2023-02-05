import React from "react";
import "./article-item.scss";
import { makeId } from "../../utilities";
import { Link } from "react-router-dom";
import { ArticleState } from "../../types";
import { format } from "date-fns";
import { FavoriteButton } from "../favoriteButton/favoriteButton";

export const ArticleItem: React.FC<ArticleState> = ({
  title,
  tagList,
  createdAt,
  body,
  favoritesCount,
  slug,
  author,
  favorited,
}: Pick<
  ArticleState,
  | "title"
  | "description"
  | "tagList"
  | "createdAt"
  | "body"
  | "favoritesCount"
  | "slug"
  | "author"
  | "favorited"
>) => {
  const newId = makeId();
  const tagSpans = tagList.map((tag: any) => {
    return (
      <span className="article-item__tag" key={newId()}>
        {tag}
      </span>
    );
  });

  return (
    <article className="article-item shadow">
      <header className="article-item__header">
        <Link to={`${slug}`}>
          <h5 className="article-item__title">{title} </h5>
        </Link>
        <FavoriteButton
          favorited={favorited}
          favoritesCount={favoritesCount}
          slug={slug}
        />
        <div className="article-item__nickname-container">
          <div className="article-item__nickname">{author.username}</div>
          <span className="article-item__date">
            {format(new Date(createdAt), "LLLL 	d, y")}
          </span>
        </div>
        <img
          className="article-item__icon"
          src={author.image}
          alt={author.username}
        />
      </header>
      <div className="article-item__article-tags">{tagSpans}</div>
      <p className="article-item__paragraph">{body}</p>
    </article>
  );
};
