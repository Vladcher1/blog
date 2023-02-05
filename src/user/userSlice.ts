import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CurrentUserState, DataUser } from "../types";

export const initialState: CurrentUserState = {
  user: null,
  isLogged: null,
  status: "loading", //'loading', 'succeeded', 'fail'
  error: null,
};

export const updateUser: any = createAsyncThunk(
  "user/updateUser",
  async (
    {
      newEmail,
      newPassword,
      newImage = "https://api.realworld.io/images/smiley-cyrus.jpeg",
      newUsername,
    }: any,
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

      return user;
    } catch (error: any) {
      if (error.response) {
        // dispatch(setError(error.response.data.errors));
        return rejectWithValue(error.response.data.errors);
        // throw new Error("client received an error response (5xx, 4xx)");
      } else if (error.request) {
        // dispatch(setError(error.data.errors));
        return rejectWithValue(error.data.errors);
      } else {
        throw new Error("unexpected error, ", error);
      }
    }
  }
);

export const checkCurrentUser: any = createAsyncThunk(
  "user/checkCurrentUser",
  async (token, { dispatch }) => {
    if (token === undefined || token === null) {
      dispatch(signIn({ payload: null }));
    }
    const { data } = await axios.get(`https://blog.kata.academy/api/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(signIn({ payload: data }));
    return data;
  }
);

export const signInUserSlice: any = createAsyncThunk(
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

      // dispatch(signIn({ payload: data }));
      localStorage.setItem("userToken", `${data.user.token}`);
      return data;
    } catch (error: any) {
      if (error.response) {
        // dispatch(setError(error.response.data.errors));
        return rejectWithValue(error.response.data.errors);
        // throw new Error("client received an error response (5xx, 4xx)");
      } else if (error.request) {
        // dispatch(setError(error.data.errors));
        return rejectWithValue(error.data.errors);
      } else {
        throw new Error("unexpected error, ", error);
      }
    }
  }
);

export const UserSlice: any = createSlice({
  name: "user",
  initialState,
  reducers: {
    signUp: (state) => {
      state.status = "succeeded";
      state.error = null;
    },
    // signIn: (state, action) => {
    //   const { payload } = action;
    //   state.user = payload.payload.user;
    //   state.isLogged = true;
    //   state.status = "succeeded";
    //   state.error = null;
    // },
    logOut: (state, action) => {
      state.user = null;
      state.isLogged = false;
      state.status = "succeeded";
      state.error = null;
      localStorage.removeItem("userToken");
    },
    setError: (state, action) => {
      state.status = "rejected";
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
      state.status = "succeeded";
      state.error = action.payload;
      state.user = null;
    },
    // .................................................................

    [signInUserSlice.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [signInUserSlice.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.error = null;
      console.log(action);
      state.user = action.payload.user;
      // state.user = action.payload.user;
      state.isLogged = true;
      //   state.status = "succeeded";
      //   state.error = null;
    },
    [signInUserSlice.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },

    // ..................................................

    [updateUser.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.user = action.payload;
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
