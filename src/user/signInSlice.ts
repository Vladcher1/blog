import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ArticlesState, UserState, CurrentUserState } from "../types";
const ARTICLES_URL = `https://api.realworld.io/api/articles?`;

const initialState: CurrentUserState = {
  user: null,
  isLogged: false,
  status: "loading", //'loading', 'succeeded', 'fail'
};

export const signInUserSlice = createAsyncThunk(
  "user/signInUser",
  async (user, { dispatch }) => {
    const { password, email }: any = user;
    const { data } = await axios.post(
      `https://api.realworld.io/api/users/login`,
      {
        user: {
          email: `${email}`,
          password: `${password}`,
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

      state.user = payload.payload.user;
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
      // state.user = [...action.payload.articles];
      state.isLogged = true;
      // state.users = action.payload.user.user;
    },
    [signInUserSlice.rejected]: (state: any, action: any) => {
      console.log(action.error);
      state.status = "failed";
      
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
