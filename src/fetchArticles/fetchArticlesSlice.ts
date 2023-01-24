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
    [fetchArticlesSlice.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchArticlesSlice.fulfilled]: (state, action) => {
      state.status = "succeeded";
      console.log(action.payload, "fulfilled");
      state.articles = [...action.payload.articles];
      state.currentPage = state.currentPage;
      state.articlesCount = action.payload.articlesCount;
    },
    [fetchArticlesSlice.rejected]: (state, action) => {
      console.log(action.payload);
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

// Action creators are generated for each case reducer function
export const { fetchArticles, setStatus } = ArticlesSlice.actions;

export default ArticlesSlice.reducer;
