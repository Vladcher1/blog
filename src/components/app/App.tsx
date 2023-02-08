import { ArticleList } from "../article-list/article-list";
import "./app.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import { ArticleItemPage } from "../article-item-page/article-item-page";
import { NotFoundPage } from "../not-found-page/not-found-page";
import { Layout } from "../layout/layout";
import { useEffect, useState } from "react";
import { NetworkError } from "../error/NetworkError";
import { SignInPage } from "../sign-in-page/sign-in-gape";
import { SignUpPage } from "../sign-up-page/sign-up-page";
import { EditProfile } from "../editProfile/editProfile";
import { useSelector } from "react-redux";
import { ArticleForm } from "../articleForm/articleForm";
import {  StateI } from "../../types";


const App: React.FC = () => {
  const [network, setNetwork] = useState<boolean>(true);

  const isLogged = useSelector<StateI>(({ user }) => user.isLogged);

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
          <Route
            path="profile"
            element={!isLogged ? <SignInPage /> : <EditProfile />}
          />
          <Route path=":slug" element={<ArticleItemPage />}></Route>
          <Route
            path=":slug/edit"
            element={
              !isLogged ? (
                <Navigate to="/sign-in" />
              ) : (
                <ArticleForm title="Edit Article" />
              )
            }></Route>
        </Route>
        <Route path="/*" element={<Layout />}>
          <Route
            path="new-article"
            element={
              !isLogged ? (
                <Navigate to="/sign-in" />
              ) : (
                <ArticleForm title="Create New Article" />
              )
            }
          />
          {!isLogged ? (
            <Route path="sign-in" element={<SignInPage />} />
          ) : (
            <Route path="sign-in" element={<Navigate to="/articles" />} />
          )}
        </Route>
        <Route path="/*" element={<Layout />}>
          <Route path="sign-up" element={<SignUpPage />} />
        </Route>
        <Route path="/*" element={<Layout />}>
          <Route
            path="profile"
            element={isLogged ? <EditProfile /> : <Navigate to="/sign-in" />}
          />
        </Route>
        <Route path="/" element={<Navigate to="/articles" />} />
        <Route path="*" element={<Layout />}>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
