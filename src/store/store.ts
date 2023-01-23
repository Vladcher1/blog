import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../counter/counterSlice";
import ArticlesSliceReducer from "../fetchArticles/fetchArticlesSlice";
// import {  } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
      fetchArticles: ArticlesSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
