import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { ArticlesState } from "../types";

const ARTICLES_URL = `https://api.realworld.io/api/articles?`;

const initialState: ArticlesState = {
  articles: [],
  status: "loading", //'loading', 'succeeded', 'fail'
  error: null,
  currentPage: 1,
  articlesCount: null,
};

export const signInUserSlice = createAsyncThunk(
  "user/signInUser",
  async (user, { dispatch }) => {
    const { password, email } = user;
    const { data } = await axios.post(
      `https://api.realworld.io/api/users/login`,
      {
        user: {
          email: "string",
          password: "string",
        },
      }
    );
    console.log(data, "data in signupslice");
    dispatch(signIn({ payload: data }));
    return data;
  }
);

export const UserSlice = createSlice({
  name: "userSignIn",
  initialState,
  reducers: {
    signIn: (state, action) => {
      const { payload } = action;
      // const { page } = payload;
      console.log("in signup", state, action);
      // state.articles = payload.payload.articles;
      // state.articlesCount = payload.payload.articlesCount;
      // state.currentPage = page;
    },
    //  setStatus: (state, action) => {
    //    const { payload } = action;
    //    state.status = payload;
    //  },
  },
  extraReducers: {
    [signInUserSlice.pending]: (state: any, action: any) => {
      // state.status = "loading";
      // state.error = null;
    },
    [signInUserSlice.fulfilled]: (state: any, action: any) => {
      state.status = "succeeded";
      console.log(action.payload, "fulfilled");
      // state.articles = [...action.payload.articles];
      // state.currentPage = state.currentPage;
      // state.articlesCount = action.payload.articlesCount;
    },
    [signInUserSlice.rejected]: (state: any, action: any) => {
      console.log(action.error);
      // state.status = "failed";
      // console.log(action);
      // state.error = action.error;

      if (action.error.response) {
        // Запрос был сделан, и сервер ответил кодом состояния, который
        // выходит за пределы 2xx
        console.log(action.error.response.data);
        console.log(action.error.response.status);
        console.log(action.error.response.headers);
      } else if (action.error.request) {
        // Запрос был сделан, но ответ не получен
        // `error.request`- это экземпляр XMLHttpRequest в браузере и экземпляр
        // http.ClientRequest в node.js
        console.log(action.error.request);
      } else {
        // Произошло что-то при настройке запроса, вызвавшее ошибку
        console.log("Error", action.error.message);
      }
      console.log(action.error.config);
    },
  },
});

// Action creators are generated for each case reducer function
export const { signIn } = UserSlice.actions;

export default UserSlice.reducer;
