import { configureStore } from "@reduxjs/toolkit";
import ArticlesSliceReducer from "../fetchArticles/fetchArticlesSlice";
import UserSliceReducer from "../user/userSlice";

export const store = configureStore({
  reducer: {
    fetchArticles: ArticlesSliceReducer,
    user: UserSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
