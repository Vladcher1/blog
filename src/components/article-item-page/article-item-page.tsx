import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../spinner/spinner";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./article-item-page.scss";

// import "../../img/unfavorite.svg";
import { makeId } from "../../utilities";
import Confirm from "../popconfirm/popconfirm";
import { FavoriteButton } from "../favoriteButton/favoriteButton";
import { useSelector } from "react-redux";

export const ArticleItemPage = () => {
  const [article, setArticle] = useState();
  const [status, setStatus] = useState("loading");
  const user = useSelector((state) => state.user.user);
  const { slug } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const getArticle = async () => {
      const { data } = await axios.get(
        `https://blog.kata.academy/api/articles/${slug}`,
        {
          headers: {
            "content-type": "application/json; charset=utf-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setArticle(data);
      setStatus("completed");
      return data;
    };

    getArticle();
  }, [slug]);

  if (status === "loading") {
    return (
      <article className="full-page-article">
        <Spinner />
      </article>
    );
  }

  const {
    body,
    title,
    description,
    tagList,
    favoritesCount,
    author,
    favorited,
    createdAt,
  }: any = article.article;
  {
    const newId = makeId();

    return (
      <article className="full-page-article shadow">
        <header className="full-page-article__header">
          <h5 className="full-page-article__title">{title}</h5>
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
        <div className="full-page-article__tags">
          {tagList.map((tag: any) => {
            return (
              <span className="article-item__tag" key={newId()}>
                {tag}
              </span>
            );
          })}
        </div>
        <div className="full-page-article__article-info">
          {description}
          {author.username === user.username && (
            <div className="full-page-article__buttons">
              <Confirm />
              <Link to={`/articles/${slug}/edit`} className="edit-button">
                Edit
              </Link>
            </div>
          )}
        </div>
        <div className="article-item__body">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
        </div>
      </article>
    );
  }
};
