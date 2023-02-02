import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CurrentUserState, DataUser, NewUserData, UserState } from "../types";

export const initialState: CurrentUserState = {
  user: null,
  isLogged: null,
  status: "loading", //'loading', 'succeeded', 'fail'
  error: null,
};

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (
    {
      newEmail,
      newPassword,
      newImage = "https://api.realworld.io/images/smiley-cyrus.jpeg",
      newUsername,
    }: NewUserData,
    { rejectWithValue, dispatch }
  ) => {
    try {
      const token = localStorage.getItem("userToken");
      const {
        data: { user },
      } = await axios.put<DataUser>(
        `https://blog.kata.academy/api/user`,
        {
          user: {
            username: newUsername,
            email: newEmail,
            password: newPassword,
            image: newImage,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(signIn({ payload: user }));
      return user;
    } catch (error) {
      if (error.response) {
        // client received an error response (5xx, 4xx)
        console.log(
          error.response,
          "client received an error response (5xx, 4xx)"
        );
        return rejectWithValue(error.response.data.errors);
      } else if (error.request) {
        console.log(error, "request never left");
        return rejectWithValue(error.request);
        // client never received a response, or request never left
      } else {
        // anything else
      }
    }
  }
);

export const checkCurrentUser = createAsyncThunk(
  "user/checkCurrentUser",
  async (token, { rejectWithValue, dispatch }) => {
    try {
      if (token !== undefined) {
        const { data } = await axios.get(`https://blog.kata.academy/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        dispatch(signIn({ payload: data }));
        return data;
      }
    } catch (error: any) {
      if (error.response) {
        // client received an error response (5xx, 4xx)
        console.log(error, "client received an error response (5xx, 4xx)");
        return rejectWithValue(error.response.data.errors);
      } else if (error.request) {
        console.log(error, "request never left");
        return rejectWithValue(error.request);
        // client never received a response, or request never left
      } else {
        // anything else
      }
    }
  }
);

export const signInUserSlice = createAsyncThunk(
  "user/signInUser",
  async (user, { rejectWithValue, dispatch }) => {
    try {
      const { password, email }: any = user;
      const { data } = await axios.post<DataUser>(
        `https://blog.kata.academy/api/users/login`,
        {
          user: {
            email: `${email}`,
            password: `${password}`,
          },
        }
      );
      dispatch(signIn({ payload: data }));
      localStorage.setItem("userToken", `${data.user.token}`);
      return data;
    } catch (error: any) {
      if (error.response) {
        // client received an error response (5xx, 4xx)
        console.log(
          error.response.data.errors,
          "client received an error response (5xx, 4xx)"
        );
        return rejectWithValue(error.response.data.errors);
      } else if (error.request) {
        console.log(error, "request never left");
        return rejectWithValue(error.request);
        // client never received a response, or request never left
      } else {
        // anything else
      }
    }
  }
);

export const signUpUserSlice = createAsyncThunk(
  "user/signUpUser",
  async (user, { rejectWithValue, dispatch }) => {
    try {
      const {
        username,
        password,
        email,
      }: Pick<UserState, "username" | "password" | "email"> = user;
      const { data } = await axios.post(`https://blog.kata.academy/api/users`, {
        user: {
          username: `${username}`,
          email: `${email}`,
          password: `${password}`,
        },
      });
      dispatch(signUp({ payload: data }));
      return data;
    } catch (error: any) {
      if (error.response) {
        // client received an error response (5xx, 4xx)
        console.log(
          error.response.data.errors,
          "client received an error response (5xx, 4xx)"
        );
        return rejectWithValue(error.response.data.errors);
      } else if (error.request) {
        console.log(error, "request never left");
        return rejectWithValue(error.request);
        // client never received a response, or request never left
      } else {
        // anything else
      }
    }
  }
);

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signUp: (state) => {
      state.status = "success";
      state.error = null;
    },
    signIn: (state, action) => {
      const { payload } = action;
      state.user = payload.payload.user;
      state.isLogged = true;
      state.status = "success";
      state.error = null;
    },
    logOut: (state, action) => {
      state.user = null;
      state.isLogged = false;
      state.status = "success";
      state.error = null;
      localStorage.removeItem("userToken");
    },
    setError: (state, action) => {
      state.status = "fail";
      state.error = action.payload;
    },
  },
  extraReducers: {
    [checkCurrentUser.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [checkCurrentUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.user = action.payload.user;
    },
    [checkCurrentUser.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    // .................................................................

    [signInUserSlice.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [signInUserSlice.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.user = action.payload.user;
    },
    [signInUserSlice.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    //.................................................................
    [signUpUserSlice.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [signUpUserSlice.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.user = action.payload.user;
    },
    [signUpUserSlice.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    //..................................................

    [updateUser.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.user = action.payload.user;
    },
    [updateUser.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { signUp, signIn, logOut, setError } = UserSlice.actions;

export default UserSlice.reducer;
