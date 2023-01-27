import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../counter/counterSlice";
import ArticlesSliceReducer from "../fetchArticles/fetchArticlesSlice";
import UserSliceReducer from "../user/signUpSlice";
import UserSignInSliceReducer from "../user/signInSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    fetchArticles: ArticlesSliceReducer,
    user: UserSliceReducer,
    users: UserSignInSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
