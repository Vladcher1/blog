import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../spinner/spinner";

export const ArticleItemPage = () => {
  const [article, setArticle] = useState();
  const [status, setStatus] = useState("loading");

  const { slug } = useParams();

  useEffect(() => {
    const getArticle = async () => {
      const { data } = await axios.get(
        `https://api.realworld.io/api/articles/${slug}`,
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

  console.log(status);

  if (status === "loading") {
    return (
      <article className="article-item">
        <Spinner />
      </article>
    );
  }

  const { body, title, description, tagList, updatedAt, favoritesCount } =
    article.article;

  return (
    <article className="article-item">
      <header className="article-item__header">
        <h5 className="article-item__title">{title}</h5>
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
        {description}
        <span className="article-item__date">{updatedAt} </span>
      </div>
      <p className="article-item__paragraph">{body}</p>
    </article>
  );
};
