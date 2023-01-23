import { createSlice } from "@reduxjs/toolkit";
import {
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import axios from "axios";

const ARTICLES_URL = `https://api.realworld.io/api/articles?`;
// limit=5&offset=0

export interface ArticlesState {
  articles: any[];
  status: string;
  error: any;
  currentPage: number;
  articlesCount: number | null;
}

const initialState: ArticlesState = {
  articles: [],
  status: "loading", //'loading', 'succeeded', 'fail'
  error: null,
  currentPage: 1,
  articlesCount: null,
};

export const fetchArticlesSlice = createAsyncThunk(
  "articles/fetchArticles",
  async (page: any = 1) => {
    console.log(page);
    const limit = 5;
    const offset = page === 1 ? 0 : (page - 1) * 5;
    const response = await axios.get(
      `${ARTICLES_URL}limit=${limit}&offset=${offset}`,
      {
        headers: { "content-type": "application/json; charset=utf-8" },
      }
    );
    console.log("response", response);
    return response.data;
  }
);

export const ArticlesSlice = createSlice({
  name: "articles",
  initialState,
  //редьюсеры мутируют стейт и ничего не возвращают наружу
  reducers: {
    fetchArticles: (state, action) => {
      console.log("state", action.payload);
      console.log(action.payload, "ЯЧ ТУТ");
      state.articles = {
        ...state,
        articles: action.payload,
        currentPage: action.payload.currentPage,
      };
      // return { ...state, articles: action.payload };
    },
    changePage: (state, action) => {
      console.log("state in chanhge page", action.payload);
      state = { ...state, currentPage: action.payload.currentPage };
      // return { ...state, currentPage: action.payload };
    },
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(fetchArticlesSlice.pending, (state, action) => {
  //         state.status = "loading";
  //       })
  //       .addCase(fetchArticlesSlice.fulfilled, (state, action) => {
  //         state.status = "succeeded";
  //         console.log(action);
  //         state.articles = [...state.articles, action.payload];
  //       })
  //       .addCase(fetchArticlesSlice.rejected, (state, action) => {
  //         state.status = "failed";
  //         state.error = action.error.message;
  //       });
  //   },
  extraReducers: {
    [fetchArticlesSlice.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchArticlesSlice.fulfilled]: (state, action) => {
      state.status = "succeeded";
      console.log(action.payload, "fulfilled");
      state.articles = [...action.payload.articles];
      // state.currentPage = action.payload.currentPage;
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
export const { fetchArticles, changePage } = ArticlesSlice.actions;

export default ArticlesSlice.reducer;
