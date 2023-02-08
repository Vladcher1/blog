import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ArticleItem } from "../article-item/article-item";
import "./article-list.scss";
import { Pagination } from "antd";
import { ArticleState } from "../../types";
import { makeId, cutInfo } from "../../utilities";
import { fetchArticlesSlice } from "../../fetchArticles/fetchArticlesSlice";
import Spinner from "../spinner/spinner";
import { StateI } from "../app/App";

export const ArticleList: React.FC = () => {
  const articles = useSelector((state: StateI) => state.fetchArticles);
  const page = useSelector((state: StateI) => state.fetchArticles.currentPage);

  const dispatch = useDispatch();

  const onChange = (page: number) => {
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
    return (
      <section className="article-list">
        <div className="error">oops, something went wrong :(</div>
      </section>
    );
  }
  const newId = makeId();
  const articlesArr = articles.articles.map((article: ArticleState) => {
    const {
      body,
      slug,
      title,
      description,
      tagList,
      createdAt,
      favoritesCount,
      author,
      favorited,
    } = article;
    const cutText = cutInfo(body, 100);
    const cutTitle = cutInfo(title, 50);
    console.log(favoritesCount, favorited);
    return (
      <ArticleItem
        author={author}
        slug={slug}
        key={newId()}
        title={cutTitle}
        body={cutText}
        description={description}
        tagList={tagList}
        createdAt={createdAt}
        favoritesCount={favoritesCount}
        favorited={favorited}
      />
    );
  });

  return (
    <div className="article-list-container">
      <section className="article-list">{articlesArr}</section>
      <Pagination
        className="pagination"
        current={page}
        total={articles.articlesCount || undefined}
        pageSize={5}
        onChange={onChange}
      />
    </div>
  );
};
