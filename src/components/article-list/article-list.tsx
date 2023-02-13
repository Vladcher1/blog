import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ArticleItem } from "../article-item/article-item";
import "./article-list.scss";
import { Pagination } from "antd";
import { ArticleState, StateI } from "../../types";
import { makeId, cutInfo, cutText } from "../../utilities";
import { fetchArticlesSlice } from "../../fetchArticles/fetchArticlesSlice";
import Spinner from "../spinner/spinner";
import { useParams, useNavigate } from "react-router-dom";

export const ArticleList: React.FC = () => {
  const articles = useSelector((state: StateI) => state.fetchArticles);
  const { page } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [curPage, setCurPage] = useState(page);

  useEffect(() => {
    setCurPage(page);
  }, [page]);

  const onChange = (page: number) => {
    setCurPage(String(page));
  };

  useEffect(() => {
    dispatch(fetchArticlesSlice(curPage));
    navigate(`/articles/${curPage}`);
  }, [curPage]);

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
    const cutBody = cutInfo(body, 100, cutText);
    const cutTitle = cutInfo(title, 30, cutText);
    const cutDescription = cutInfo(description, 200, cutText);
    return (
      <ArticleItem
        author={author}
        slug={slug}
        key={newId()}
        title={cutTitle}
        body={cutBody}
        description={cutDescription}
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
        current={Number(page)}
        total={articles.articlesCount || undefined}
        pageSize={5}
        onChange={onChange}
      />
    </div>
  );
};
