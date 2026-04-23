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
      return data; // Ensure this contains { user: { name, email, city, ... } }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

// 🔹 GET USER PROFILE (To refresh city if needed)
export const fetchUserProfile = createAsyncThunk(
  "user/profile",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/user/profile"); // Assuming this endpoint exists based on usual patterns
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Failed to fetch profile" },
      );
    }
  },
);

// 🔹 UPDATE SALARY
export const updateSalary = createAsyncThunk(
  "user/updateSalary",
  async (salary, thunkAPI) => {
    try {
      const { data } = await api.patch("/user/profile/salary", { salary });
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Failed to update salary" },
      );
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    loading: false,
    error: null,
    data: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("access_token");
      state.isLogin = false;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLogin = true;
        state.data = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || action.payload || "Login failed";
      })

      // PROFILE
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLogin = true;
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLogin = false;
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.payload ||
          "Failed to fetch profile";
        localStorage.removeItem("access_token");
      })

      // UPDATE SALARY
      .addCase(updateSalary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSalary.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(updateSalary.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.payload ||
          "Failed to update salary";
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
