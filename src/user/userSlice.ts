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
const USER_API = "https://blog.kata.academy/api/";

export interface UpdateUserType {
  newEmail: string;
  newPassword: string;
  newImage: string;
  newUsername: string;
}

export const updateUser: any = createAsyncThunk(
  "user/updateUser",
  async (
    {
      newEmail,
      newPassword,
      newImage = "https://api.realworld.io/images/smiley-cyrus.jpeg",
      newUsername,
    }: any,
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("userToken");
      const {
        data: { user },
      } = await axios.put<DataUser>(
        `${USER_API}user`,
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
        return rejectWithValue(error.response.data.errors);
      } else if (error.request) {
        return rejectWithValue(error.data.errors);
      } else {
        throw new Error("unexpected error, ", error);
      }
    }
  }
);

export const checkCurrentUser: any = createAsyncThunk(
  "user/checkCurrentUser",
  async (token) => {
    const {
      data: { user },
    } = await axios.get<DataUser>(`${USER_API}user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return user;
  }
);

export const signInUserSlice: any = createAsyncThunk(
  "user/signInUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { password, email }: any = userData;
      const {
        data: { user },
      } = await axios.post<DataUser>(`${USER_API}users/login`, {
        user: {
          email: `${email}`,
          password: `${password}`,
        },
      });

      localStorage.setItem("userToken", `${user.token}`);
      return user;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.errors);
      } else if (error.request) {
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
    logOut: (state) => {
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
      state.isLogged = true;
      state.user = action.payload;
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
      state.user = action.payload;
      state.isLogged = true;
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
export const { signUp, logOut, setError } = UserSlice.actions;

export default UserSlice.reducer;
