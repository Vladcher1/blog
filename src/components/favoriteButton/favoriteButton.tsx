import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  favoriteArticle,
  unfavoriteArticle,
} from "../../fetchArticles/fetchArticlesSlice";
import "./favoriteButton.scss";
export const FavoriteButton = ({ favoritesCount, slug, favorited }) => {
  const dispatch = useDispatch();
  console.log(favorited, "favorited in each article");

  //   let classNames = "article-item__like-btn-number";
  //   if (favorited) {
  //     classNames = "article-item__like-btn-number active-favorite";
  //   }
  useEffect(() => {
    console.log(favorited);
  }, [favorited]);

  return (
    <button className="article-item__like-btn">
      <img src="/like.svg" alt="like" />
      <span
        className={
          favorited
            ? "article-item__like-btn-number active-favorite"
            : "article-item__like-btn-number"
        }
        onClick={() => {
          console.log(favorited);
          if (favorited) {
            dispatch(unfavoriteArticle(slug));
          } else {
            dispatch(favoriteArticle(slug));
          }
        }}>
        {favoritesCount}
      </span>
    </button>
  );
};
