import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { ArticlesState } from "../types";

const ARTICLES_URL = `https://api.realworld.io/api/articles?`;

const initialState: ArticlesState = {
  user: null,
  articles: [],
  status: "loading", //'loading', 'succeeded', 'fail'
  error: null,
  currentPage: 1,
  articlesCount: null,
};

export const fetchArticlesSlice = createAsyncThunk(
  "articles/fetchArticles",
  async (page: any = 1, { dispatch }) => {
    const limit = 5;
    const offset = page === 1 ? 0 : (page - 1) * 5;
    const { data } = await axios.get(
      `${ARTICLES_URL}limit=${limit}&offset=${offset}`,
      {
        headers: { "content-type": "application/json; charset=utf-8" },
      }
    );
    dispatch(fetchArticles({ payload: data, page }));
    return data;
  }
);

export const ArticlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    fetchArticles: (state, action) => {
      const { payload } = action;
      const { page } = payload;
      state.articles = payload.payload.articles;
      state.articlesCount = payload.payload.articlesCount;
      state.currentPage = page;
    },
    setStatus: (state, action) => {
      const { payload } = action;
      state.status = payload;
    },
  },
  extraReducers: {
    [fetchArticlesSlice.pending]: (state: any, action: any) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchArticlesSlice.fulfilled]: (state: any, action: any) => {
      state.status = "succeeded";
      console.log(action.payload, "fulfilled");
      state.articles = [...action.payload.articles];
      state.currentPage = state.currentPage;
      state.articlesCount = action.payload.articlesCount;
    },
    [fetchArticlesSlice.rejected]: (state: any, action: any) => {
      console.log(action.error);
      state.status = "failed";
      console.log(action);
      state.error = action.error;

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
export const { fetchArticles, setStatus } = ArticlesSlice.actions;

export default ArticlesSlice.reducer;
