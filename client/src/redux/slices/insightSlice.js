import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchInsight = createAsyncThunk("insights/fetch", async () => {
  const { data } = await api.get("/insights");
  return data;
});

const insightSlice = createSlice({
  name: "insights",
  initialState: {
    data: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInsight.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default insightSlice.reducer;
