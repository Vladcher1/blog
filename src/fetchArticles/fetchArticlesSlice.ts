import { createSlice, current } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { ArticlesState } from "../types";

const ARTICLES_URL = `https://blog.kata.academy/api/`;

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
  }
);

export const postArticle = createAsyncThunk(
  "articles/postArticle",
  async (article: ArticlesState, { dispatch }) => {
    const token = localStorage.getItem("userToken");
    console.log(article);

    const {
      tagListArray: tagList,
      titleTrimmed: title,
      bodyTrimmed: body,
      descriptionTrimmed: description,
    } = article;
    console.log(tagList);
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
    console.log(data);
    return data;
  }
);

export const updateArticle = createAsyncThunk(
  "articles/updateArticle",
  async (article: ArticlesState, { dispatch }) => {
    const token = localStorage.getItem("userToken");
    console.log(article);

    const {
      slug,
      tagListArray: tagList,
      titleTrimmed: title,
      bodyTrimmed: body,
      descriptionTrimmed: description,
    } = article;
    console.log(tagList);
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
    console.log(data);
    return data;
  }
);

export const deleteArticle = createAsyncThunk(
  "articles/updateArticle",
  async (slug: ArticlesState, { dispatch }) => {
    const token = localStorage.getItem("userToken");
    const { data } = await axios.delete(
      `${ARTICLES_URL}articles/${slug.slug}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  }
);

export const favoriteArticle = createAsyncThunk(
  "articles/favoriteArticle",
  async (slug: ArticlesState, { dispatch }) => {
    console.log("favorite", slug);
    const token = localStorage.getItem("userToken");
    console.log(token);
    const { data } = await axios.post(
      `${ARTICLES_URL}articles/${slug}/favorite`,
      {
        //   article: {
        //     favorited: true,
        //   },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data);
    // dispatch(setFavorite({ payload: data }));

    return data;
  }
);
//  https://blog.kata.academy/api/articles/rgvdfbar-l5fah2/favorite

export const unfavoriteArticle = createAsyncThunk(
  "articles/unfavoriteArticle",
  async (slug: ArticlesState, { dispatch }) => {
    console.log("unfavorite", slug);
    const token = localStorage.getItem("userToken");
    console.log(token);

    const { data } = await axios.delete(
      `${ARTICLES_URL}articles/${slug}/favorite`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data);
    // dispatch(setFavorite(data));
    // dispatch(setFavorite({ payload: data }));

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
    setFavorite: (state, action) => {
      const { payload } = action;
      console.log(state, payload);
    },
  },
  extraReducers: {
    [fetchArticlesSlice.pending]: (state: any, action: any) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchArticlesSlice.fulfilled]: (state: any, action: any) => {
      console.log(action);
      state.status = "succeeded";
      state.articles = [...action.payload.articles];
      state.articlesCount = action.payload.articlesCount;
    },
    [fetchArticlesSlice.rejected]: (state: any, action: any) => {
      console.log(action.error);
      state.status = "failed";
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

    //.......................................

    [postArticle.pending]: (state: any, action: any) => {
      state.status = "loading";
      state.error = null;
      console.log("запрос на создание поста отправляется");
    },
    [postArticle.fulfilled]: (state: any, action: any) => {
      console.log("запрос на создание поста успешен");
      state.status = "succeeded";
      // state.articles = [...action.payload.articles];
      // state.articlesCount = action.payload.articlesCount;
    },
    [postArticle.rejected]: (state: any, action: any) => {
      console.log("запрос на создание поста с ошибкой");
      console.log(action.error);
      state.status = "failed";
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
    //.......................................

    [favoriteArticle.pending]: (state: any, action: any) => {
      // state.status = "loading";
      // state.error = null;
      console.log("лайк отправляется");
    },
    [favoriteArticle.fulfilled]: (state: any, action: any) => {
      console.log("лайк успешен", action.payload, current(state));
      console.log(
        "лайк успешен",
        action.payload.article.slug,
        current(state.articles)
      );

      state.status = "succeeded";
      // state.articles = [...action.payload.articles];
      state.articles = state.articles.map((article) => {
        console.log(current(article));
        if (article.slug === action.payload.article.slug) {
          return action.payload.article;
        }
        return article;
      });
      // state.articlesCount = action.payload.articlesCount;
    },
    [favoriteArticle.rejected]: (state: any, action: any) => {
      console.log("лайк с ошибкой");
      console.log(action.error);
      state.status = "failed";
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

    //.......................................

    [unfavoriteArticle.pending]: (state: any, action: any) => {
      // state.status = "loading";
      // state.error = null;
      console.log("лайк отправляется");
    },
    [unfavoriteArticle.fulfilled]: (state: any, action: any) => {
      console.log("лайк успешен", action.payload, current(state));
      console.log(
        "лайк успешен",
        action.payload.article.slug,
        current(state.articles)
      );

      state.status = "succeeded";
      // state.articles = [...action.payload.articles];
      state.articles = state.articles.map((article) => {
        console.log(current(article));
        if (article.slug === action.payload.article.slug) {
          return action.payload.article;
        }
        return article;
      });
      // state.articlesCount = action.payload.articlesCount;
    },
    [unfavoriteArticle.rejected]: (state: any, action: any) => {
      console.log("лайк с ошибкой");
      console.log(action.error);
      state.status = "failed";
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
