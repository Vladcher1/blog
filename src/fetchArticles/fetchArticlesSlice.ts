import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { ArticlesState } from "../types";

const ARTICLES_URL = `https://blog.kata.academy/api/`;

const initialState: any = {
  // user: null,
  articles: [],
  status: "loading", //'loading', 'succeeded', 'fail'
  error: null,
  currentPage: 1,
  articlesCount: null,
};

export const fetchArticlesSlice: any = createAsyncThunk(
  "articles/fetchArticles",
  async (page: any = 1, { dispatch, rejectWithValue }) => {
    try {
      const limit = 5;
      const offset = page === 1 ? 0 : (page - 1) * 5;
      const token = localStorage.getItem("userToken");
      const { data } = await axios.get(
        `${ARTICLES_URL}articles?limit=${limit}&offset=${offset}`,
        {
          headers: {
            "content-type": "application/json; charset=utf-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(fetchArticles({ payload: data, page }));
      return data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.errors);
      } else if (error.request) {
        return rejectWithValue(error.request);
      }
    }
  }
);

export const postArticle: any = createAsyncThunk(
  "articles/postArticle",
  async (article: ArticlesState, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");

      const {
        tagListArray: tagList,
        titleTrimmed: title,
        bodyTrimmed: body,
        descriptionTrimmed: description,
      }: any = article;
      const { data } = await axios.post(
        `${ARTICLES_URL}articles`,
        {
          article: {
            title,
            description,
            body,
            tagList,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.errors);
      } else if (error.request) {
        return rejectWithValue(error.request);
      }
    }
  }
);

export const updateArticle: any = createAsyncThunk(
  "articles/updateArticle",
  async (article: ArticlesState, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");

      const {
        slug,
        tagListArray: tagList,
        titleTrimmed: title,
        bodyTrimmed: body,
        descriptionTrimmed: description,
      }: any = article;
      const { data } = await axios.put(
        `${ARTICLES_URL}articles/${slug}`,
        {
          article: {
            title,
            description,
            body,
            tagList,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.errors);
      } else if (error.request) {
        return rejectWithValue(error.request);
      }
    }
  }
);

export const deleteArticle: any = createAsyncThunk(
  "articles/deleteArticle",
  async (slug: ArticlesState, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      await axios.delete(`${ARTICLES_URL}articles/${slug.slug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return slug.slug;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.errors);
      } else if (error.request) {
        return rejectWithValue(error.request);
      }
    }
  }
);

export const favoriteArticle: any = createAsyncThunk(
  "articles/favoriteArticle",
  async (slug: ArticlesState, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.post(
        `${ARTICLES_URL}articles/${slug}/favorite`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.errors);
      } else if (error.request) {
        return rejectWithValue(error.request);
      }
    }
  }
);

export const unfavoriteArticle: any = createAsyncThunk(
  "articles/unfavoriteArticle",
  async (slug: ArticlesState, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.delete(
        `${ARTICLES_URL}articles/${slug}/favorite`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.errors);
      } else if (error.request) {
        return rejectWithValue(error.request);
      }
    }
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
  },
  extraReducers: {
    [fetchArticlesSlice.pending]: (state: any, action: any) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchArticlesSlice.fulfilled]: (state: any, action: any) => {
      state.status = "succeeded";
      state.articles = [...action.payload.articles];
      state.articlesCount = action.payload.articlesCount;
    },
    [fetchArticlesSlice.rejected]: (state: any, action: any) => {
      state.status = "failed";
      state.error = action.error;
    },

    //.......................................

    [postArticle.pending]: (state: any, action: any) => {
      state.status = "loading";
      state.error = null;
    },
    [postArticle.fulfilled]: (state: any, action: any) => {
      state.status = "succeeded";
      state.articles = [action.payload.article, ...state.articles];
      state.articlesCount = state.articlesCount + 1;
    },
    [postArticle.rejected]: (state: any, action: any) => {
      state.status = "failed";
      state.error = action.error;
    },

    //.......................................

    [updateArticle.pending]: (state: any, action: any) => {
      state.status = "loading";
      state.error = null;
    },
    [updateArticle.fulfilled]: (state: any, action: any) => {
      state.status = "succeeded";
      state.articles = state.articles.map((article: any) => {
        if (article.slug === action.payload.article.slug) {
          return action.payload.article;
        }
        return article;
      });
    },
    [updateArticle.rejected]: (state: any, action: any) => {
      state.status = "failed";
      state.error = action.error;
    },
    //.......................................

    [deleteArticle.pending]: (state: any, action: any) => {
      state.status = "loading";
      state.error = null;
    },
    [deleteArticle.fulfilled]: (state: any, action: any) => {
      state.status = "succeeded";
      state.articles = state.articles.filter(
        (article: any) => article.slug !== action.payload
      );
      state.articlesCount = state.articlesCount - 1;
    },
    [deleteArticle.rejected]: (state: any, action: any) => {
      state.status = "failed";
      state.error = action.error;
    },
    //.......................................

    [favoriteArticle.fulfilled]: (state: any, action: any) => {
      state.status = "succeeded";
      state.articles = state.articles.map((article: any) => {
        if (article.slug === action.payload.article.slug) {
          return action.payload.article;
        }
        return article;
      });
    },
    [favoriteArticle.rejected]: (state: any, action: any) => {
      state.status = "failed";
      state.error = action.error;
    },

    //.......................................

    [unfavoriteArticle.fulfilled]: (state: any, action: any) => {
      state.status = "succeeded";
      state.articles = state.articles.map((article: any) => {
        if (article.slug === action.payload.article.slug) {
          return action.payload.article;
        }
        return article;
      });
    },
    [unfavoriteArticle.rejected]: (state: any, action: any) => {
      state.status = "failed";
      state.error = action.error;
    },
  },
});

// Action creators are generated for each case reducer function
export const { fetchArticles, setStatus }: any = ArticlesSlice.actions;

export default ArticlesSlice.reducer;
