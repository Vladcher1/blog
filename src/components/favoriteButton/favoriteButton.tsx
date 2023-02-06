import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  favoriteArticle,
  unfavoriteArticle,
} from "../../fetchArticles/fetchArticlesSlice";
import "./favoriteButton.scss";

export interface FavoriteButtonProps {
  favoritesCount: number;
  slug?: string;
  favorited: boolean;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  favoritesCount,
  slug,
  favorited,
}) => {
  const dispatch = useDispatch();
  const isLogged: any = useSelector(({ user }: any) => user.isLogged);
  const [needToNavigate, setNavigation] = useState(false);

  const onButtonClick = () => {
    if (isLogged) {
      if (favorited) {
        dispatch(unfavoriteArticle(slug));
      } else {
        dispatch(favoriteArticle(slug));
      }
    } else {
      setNavigation(true);
    }
  };
  if (needToNavigate) {
    return <Navigate to="/sign-in" />;
  }
  return (
    <button className="article-item__like-btn" onClick={onButtonClick}>
      <img src={favorited ? "/favorite.svg" : "/unfavorite.svg"} alt="like" />
      <span className="article-item__like-btn-number">{favoritesCount}</span>
    </button>
  );
};
