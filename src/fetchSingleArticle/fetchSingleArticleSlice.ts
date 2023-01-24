import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { ArticlesState } from "../types";
import initialState from "../fetchArticles/fetchArticlesSlice";

export const fetchSingleArticleSlice = createAsyncThunk(
  "article/fetchSingleArticle",
  async (slug: string, { dispatch }) => {
    const SINGLE_ARTICLE_URL = `https://api.realworld.io/api/articles/${slug}`;
    const { data } = await axios.get(SINGLE_ARTICLE_URL, {
      headers: { "content-type": "application/json; charset=utf-8" },
    });
    dispatch(fetchSingleArticle({ payload: data }));
    return data;
  }
);

export const ArticleSlice = createSlice({
  name: "article",
  initialState: {},
  //редьюсеры мутируют стейт и ничего не возвращают наружу
  reducers: {
    fetchSingleArticle: (state, action) => {
      console.log(action, "ЯЧ ТУТ");
      const { payload } = action;
      const { page } = payload;
      state.articles = payload.payload.articles;
      state.articlesCount = payload.payload.articlesCount;
      state.currentPage = page;
    },
  },
  extraReducers: {
    [fetchSingleArticleSlice.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchSingleArticleSlice.fulfilled]: (state, action) => {
      state.status = "succeeded";
      console.log(action.payload, "fulfilled");
      state.articles = [...action.payload.articles];
      state.currentPage = state.currentPage;
      state.articlesCount = action.payload.articlesCount;
    },
    [fetchSingleArticleSlice.rejected]: (state, action) => {
      console.log(action.payload);
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

// Action creators are generated for each case reducer function
export const { fetchSingleArticle } = ArticleSlice.actions;

export default ArticleSlice.reducer;
