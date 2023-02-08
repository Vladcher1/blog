import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ARTICLES_URL } from "../../fetchArticles/fetchArticlesSlice";
import { NavigateType } from "../articleForm/articleForm";
import "./favoriteButton.scss";

export interface FavoriteButtonProps {
  favoritedCount?: number;
  favoritesCount?: number;
  favoritedPage?: { favorited: boolean; favoritedCount: number };
  slug?: string;
  favorited: boolean;
  setFavoritedPage?: (object: any) => void;
}

export type favoritedFromArticleList = {
  favorited: boolean;
  favoritedCount?: number;
};

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  slug,
  favorited,
  favoritedPage,
  setFavoritedPage,
  favoritesCount,
}) => {
  const isLogged: any = useSelector(({ user }: any) => user.isLogged);
  const [needToNavigate, setNavigation] = useState<NavigateType>(false);
  const [articleList, setArticleList] = useState<favoritedFromArticleList>({
    favorited: false,
    favoritedCount: 0,
  });

  const articleListRender = setFavoritedPage !== undefined;

  useEffect(() => {
    if (articleListRender) {
      setFavoritedPage({ favorited, favoritedCount: favoritesCount });
    } else {
      setArticleList({ favorited, favoritedCount: favoritesCount });
    }
  }, [articleListRender, favorited, favoritesCount, setFavoritedPage]);

  const setFavoriteFromServer = async () => {
    const token = localStorage.getItem("userToken");
    const { data } = await axios.post(
      `${ARTICLES_URL}articles/${slug}/favorite`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (articleListRender) {
      setFavoritedPage({
        favorited: data.article.favorited,
        favoritedCount: data.article.favoritesCount,
      });
    } else {
      setArticleList({
        favorited: data.article.favorited,
        favoritedCount: data.article.favoritesCount,
      });
    }
    return data;
  };

  const setUnfavoriteFromServer = async () => {
    const token = localStorage.getItem("userToken");
    const { data } = await axios.delete(
      `${ARTICLES_URL}articles/${slug}/favorite`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (articleListRender) {
      setFavoritedPage({
        favorited: data.article.favorited,
        favoritedCount: data.article.favoritesCount,
      });
    } else {
      setArticleList({
        favorited: data.article.favorited,
        favoritedCount: data.article.favoritesCount,
      });
    }
    return data;
  };

  const onButtonClick = () => {
    if (isLogged) {
      if (articleListRender) {
        if (favoritedPage?.favorited) {
          setUnfavoriteFromServer();
        } else {
          setFavoriteFromServer();
        }
      } else {
        if (articleList.favorited) {
          setUnfavoriteFromServer();
        } else {
          setFavoriteFromServer();
        }
      }
    } else {
      setNavigation(true);
    }
  };

  if (needToNavigate) {
    return <Navigate to="/sign-in" />;
  }
  if (articleListRender) {
    return (
      <button className="article-item__like-btn" onClick={onButtonClick}>
        <img
          src={favoritedPage?.favorited ? "/favorite.svg" : "/unfavorite.svg"}
          alt="like"
        />
        <span className="article-item__like-btn-number">
          {favoritedPage?.favoritedCount}
        </span>
      </button>
    );
  } else {
    return (
      <button className="article-item__like-btn" onClick={onButtonClick}>
        <img
          src={articleList.favorited ? "/favorite.svg" : "/unfavorite.svg"}
          alt="like"
        />
        <span className="article-item__like-btn-number">
          {articleList.favoritedCount}
        </span>
      </button>
    );
  }
};
