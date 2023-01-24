import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ArticleItem } from "../article-item/article-item";
import "./article-list.scss";
import { Pagination } from "antd";
import { ArticlesState, ArticleState } from "../../types";
import { makeId, cutInfo } from "../../utilities";
import { fetchArticlesSlice } from "../../fetchArticles/fetchArticlesSlice";
import Spinner from "../spinner/spinner";

export const ArticleList = () => {
  const articles: ArticlesState = useSelector(
    (state: any) => state.fetchArticles
  );
  console.log(articles, "what happens in article list");
  const page = useSelector((state: any) => state.fetchArticles.currentPage);

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
  const newId = makeId();
  console.log(articles.status, "status");
  const articlesArr = articles.articles.map((article: ArticleState) => {
    const {
      body,
      slug,
      title,
      description,
      tagList,
      updatedAt,
      favoritesCount,
    } = article;
    const cutText = cutInfo(body, 100);
    const cutTitle = cutInfo(title, 50);

    return (
      <ArticleItem
        slug={slug}
        key={newId()}
        title={cutTitle}
        body={cutText}
        description={description}
        tagList={tagList}
        createdAt={updatedAt}
        favoritesCount={favoritesCount}
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
