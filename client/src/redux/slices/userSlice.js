import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// 🔹 REGISTER
export const registerUser = createAsyncThunk(
  "user/register",
  async (payload, thunkAPI) => {
    try {
      const { data } = await api.post("/register", payload);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

// 🔹 LOGIN
export const loginUser = createAsyncThunk(
  "user/login",
  async (payload, thunkAPI) => {
    try {
      const { data } = await api.post("/login", payload);
      localStorage.setItem("access_token", data.access_token);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("access_token");
      state.isLogin = false;
    },
  },
  extraReducers: (builder) => {
    builder

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(loginUser.fulfilled, (state) => {
        state.isLogin = true;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
