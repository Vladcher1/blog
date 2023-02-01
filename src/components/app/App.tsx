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
import { ErrorNotification } from "../errorNotification/errorNotification";

const App = () => {
  const [network, setNetwork] = useState(true);

  const isLogged = useSelector((state) => state.user.isLogged);
  useEffect(() => {
    window.onoffline = () => {
      setNetwork(false);
    };
    window.ononline = () => {
      setNetwork(true);
    };
  });
  const error = useSelector((state) => state.user.error);


  return (
    <div className="app">
      {!network && <NetworkError />}
      {error && <ErrorNotification error={error} />}
      <Routes>
        <Route path="/articles" element={<Layout />}>
          <Route index element={<ArticleList />} />
          <Route path="articles" element={<ArticleList />} />
          <Route path='profile'element={!isLogged ? <SignInPage /> : <EditProfile />} />
          <Route path=":slug" element={<ArticleItemPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/*" element={<Layout />}>
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
      </Routes>
    </div>
  );
};

export default App;
