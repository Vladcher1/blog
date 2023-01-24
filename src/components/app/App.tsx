import { ArticleList } from "../article-list/article-list";
import "./app.scss";
import { Routes, Route, useParams } from "react-router-dom";
import { ArticleItemPage } from "../article-item-page/article-item-page";
import { NotFoundPage } from "../not-found-page/not-found-page";
import { Layout } from "../layout/layout";

function App() {
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
