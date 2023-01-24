import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/App";
import { fetchArticlesSlice } from "./fetchArticles/fetchArticlesSlice";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, createBrowserRouter } from "react-router-dom";

export const inizialize = () => {
  store.dispatch(fetchArticlesSlice(1));
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );

  root.render(
    <React.StrictMode>
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </React.StrictMode>
  );
};

inizialize();
