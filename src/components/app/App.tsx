import { ArticleList } from "../article-list/article-list";
import "./app.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import { ArticleItemPage } from "../article-item-page/article-item-page";
import { NotFoundPage } from "../not-found-page/not-found-page";
import { Layout } from "../layout/layout";
import { useEffect, useState } from "react";
import { NetworkError } from "../error/NetworkError";
const App = () => {
  const [network, setNetwork] = useState(true);

  useEffect(() => {
    window.onoffline = () => {
      setNetwork(false);
    };
    window.ononline = () => {
      setNetwork(true);
    };
  });

  return (
    <div className="app">
      {!network && <NetworkError />}
      <Routes>
        <Route path="/articles" element={<Layout />}>
          <Route index element={<ArticleList />} />
          <Route path="articles" element={<ArticleList />} />
          <Route path=":slug" element={<ArticleItemPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/" element={<Navigate to="/articles" />} />
      </Routes>
    </div>
  );
};

export default App;
