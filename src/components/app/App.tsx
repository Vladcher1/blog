import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { ArticleList } from "../article-list/article-list";
import { Header } from "../header/header";
import "./app.scss";
import { store } from "../../store/store";
import { Routes, Route, Link, useParams } from "react-router-dom";
import { ArticleItemPage } from "../article-item-page/article-item-page";
import { NotFoundPage } from "../not-found-page/not-found-page";
import { Layout } from "../layout/layout";
import fetchArticlesSlice from "../../fetchArticles/fetchArticlesSlice";

function App() {
  const articles = useSelector((state: RootState) => state);
  const page = useSelector(
    (state: RootState) => state.fetchArticles.currentPage
  );

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ArticleList />} />
          <Route path="articles" element={<ArticleList />} />
          <Route path="articles/:slug" element={<ArticleItemPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
