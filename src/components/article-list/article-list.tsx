import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ArticleItem } from "../article-item/article-item";
import "./article-list.scss";
import { Pagination } from "antd";
import { ArticleState } from "../../types";
import { makeId, cutInfo } from "../../utilities";
import {
  changePage,
  fetchArticles,
  fetchArticlesSlice,
} from "../../fetchArticles/fetchArticlesSlice";
import Spinner from "../spinner/spinner";
import Error from "../error/error";

export const ArticleList = () => {
  const articles = useSelector((state) => state.fetchArticles);
  console.log(articles, "what happens in article list");
  const page = useSelector((state) => state.fetchArticles.currentPage);

  const status = useSelector((state) => state);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  const onChange = (page: number) => {
    console.log(page);
    dispatch(fetchArticlesSlice(page));
  };

  if (articles.status === "loading") {
    return (
      <section className="article-list">
        <Spinner />
      </section>
    );
  }
  if (articles.error !== null) {
    console.log("тут есть ошибка");
    return (
      <section className="article-list">
        <div className="error">oops, something went wrong :(</div>
      </section>
    );
  }

  console.log(articles.status, "status");
  const articlesArr = articles.articles.map((article: ArticleState) => {
    const newId = makeId();
    const cutText = cutInfo(article.body, 100);
    const cutTitle = cutInfo(article.title, 50);

    return (
      <ArticleItem
        key={newId()}
        title={cutTitle}
        body={cutText}
        description={article.description}
        tagList={article.tagList}
        date={article.updatedAt}
        favoritesCount={article.favoritesCount}
      />
    );
  });

  return (
    <React.Fragment>
      <section className="article-list">{articlesArr}</section>
      <Pagination
        current={page}
        total={articles.articlesCount}
        pageSize={5}
        onChange={onChange}
      />
    </React.Fragment>
  );
};
