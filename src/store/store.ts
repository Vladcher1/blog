import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../counter/counterSlice";
import ArticlesSliceReducer from "../fetchArticles/fetchArticlesSlice";
import { fetchSingleArticle } from "../fetchSingleArticle/fetchSingleArticleSlice";
import ArticleSliceReducer from "../fetchSingleArticle/fetchSingleArticleSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    fetchArticles: ArticlesSliceReducer,
    // fetchSingleArticle: ArticleSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
