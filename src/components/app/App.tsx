import { ArticleList } from "../article-list/article-list";
import "./app.scss";
import { Routes, Route, useParams, Navigate, redirect } from "react-router-dom";
import { ArticleItemPage } from "../article-item-page/article-item-page";
import { NotFoundPage } from "../not-found-page/not-found-page";
import { Layout } from "../layout/layout";

function App() {
  // const { page } = useParams();
  // const page = useSelector((state) => state.fetchArticles.currentPage);

  return (
    <div className="app">
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
}

export default App;
