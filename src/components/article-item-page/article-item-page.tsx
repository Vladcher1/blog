import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../spinner/spinner";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./article-item-page.scss";
import { makeId } from "../../utilities";
import Confirm from "../popconfirm/popconfirm";
import { FavoriteButton } from "../favoriteButton/favoriteButton";
import { useSelector } from "react-redux";
import { ArticleState, FavoritedType, StateI, StatusType } from "../../types";

export const ArticleItemPage: React.FC = () => {
  const [article, setArticle]: any = useState();
  const [status, setStatus]: any = useState<StatusType>("loading");
  const [favoritedPage, setFavoritedPage] = useState<FavoritedType>({
    favorited: false,
    favoritedCount: 0,
  });

  const user = useSelector(({ user }: StateI) => user.user);
  const { slug } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const getArticle = async () => {
      const { data } = await axios.get<{ article: ArticleState }>(
        `https://blog.kata.academy/api/articles/${slug}`,
        {
          headers: {
            "content-type": "application/json; charset=utf-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setArticle(data.article);
      setStatus("completed");
    };

    getArticle();
  }, [slug, favoritedPage]);
  {
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
    }: ArticleState = article;
    const newId = makeId();

    return (
      <article className="full-page-article shadow">
        <header className="full-page-article__header">
          <h5 className="full-page-article__title">{title}</h5>
          <FavoriteButton
            favoritedPage={favoritedPage}
            setFavoritedPage={setFavoritedPage}
            favoritesCount={favoritesCount}
            slug={slug}
            favorited={favorited}
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
        <div
          className={
            author.username === user?.username
              ? "full-page-article__article-info user-article"
              : "full-page-article__article-info"
          }
        >
          {description}
          {author.username === user?.username && (
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
