import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// 🔹 FETCH INSIGHT
export const fetchInsight = createAsyncThunk(
  "insights/fetch",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/insights");
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Failed to fetch insights" },
      );
    }
  },
);

// 🔹 GENERATE NEW INSIGHT
export const generateInsight = createAsyncThunk(
  "insights/generate",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.post("/insights", {}); // Pass empty body to avoid destruction error if any
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Failed to generate AI insights" },
      );
    }
  },
);

const insightSlice = createSlice({
  name: "insights",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchInsight.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInsight.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchInsight.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // GENERATE
      .addCase(generateInsight.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateInsight.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })

      .addCase(generateInsight.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default insightSlice.reducer;
