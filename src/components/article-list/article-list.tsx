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
      updatedAt,
      favoritesCount,
      author,
      favorited,
    } = article;
    const cutText = cutInfo(body, 100);
    const cutTitle = cutInfo(title, 50);

    return (
      <ArticleItem
        author={author}
        slug={slug}
        key={newId()}
        title={cutTitle}
        body={cutText}
        description={description}
        tagList={tagList}
        createdAt={updatedAt}
        favoritesCount={favoritesCount}
        favorited={favorited}
      />
    );
  });

  console.log(articlesArr, "articlesArr");
  return (
    <div className="article-list-container">
      <section className="article-list">{articlesArr}</section>
      <Pagination
        className="pagination"
        current={page}
        total={articles.articlesCount}
        pageSize={5}
        onChange={onChange}
      />
    </div>
  );
};
