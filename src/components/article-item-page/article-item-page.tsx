import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../spinner/spinner";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./article-item-page.scss";

import "../../img/like.svg";
import { makeId } from "../../utilities";
import Confirm from "../popconfirm/popconfirm";

export const ArticleItemPage = () => {
  const [article, setArticle] = useState();
  const [status, setStatus] = useState("loading");

  const { slug } = useParams();

  useEffect(() => {
    const getArticle = async () => {
      const { data } = await axios.get(
        `https://blog.kata.academy/api/articles/${slug}`,
        {
          headers: { "content-type": "application/json; charset=utf-8" },
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
    createdAt,
  }: any = article.article;

  {
    const newId = makeId();

    return (
      <article className="full-page-article">
        <header className="full-page-article__header">
          <h5 className="full-page-article__title">{title}</h5>
          <button className="full-page-article__like-btn">
            <img src="/like.svg" alt="like" />
            <span className="full-page-article__like-btn-number">
              {favoritesCount}
            </span>
          </button>

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
          <div className="full-page-article__buttons">
            <Confirm />
            <Link to={`/articles/${slug}/edit`} className="edit-button">
              Edit
            </Link>
          </div>
        </div>
        <div className="article-item__body">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
        </div>
      </article>
    );
  }
};
