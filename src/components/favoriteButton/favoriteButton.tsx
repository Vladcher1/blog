import { useDispatch } from "react-redux";
import {
  favoriteArticle,
  unfavoriteArticle,
} from "../../fetchArticles/fetchArticlesSlice";
import "./favoriteButton.scss";

export const FavoriteButton = ({ favoritesCount, slug, favorited }) => {
  const dispatch = useDispatch();

  return (
    <button
      className="article-item__like-btn"
      onClick={() => {
        if (favorited) {
          dispatch(unfavoriteArticle(slug));
        } else {
          dispatch(favoriteArticle(slug));
        }
      }}
    >
      <img src={favorited ? "/favorite.svg" : "/unfavorite.svg"} alt="like" />
      <span className="article-item__like-btn-number">{favoritesCount}</span>
    </button>
  );
};
