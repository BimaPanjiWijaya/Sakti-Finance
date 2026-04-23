import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const addTransaction = createAsyncThunk(
  "transaction/add",
  async (payload) => {
    await api.post("/transactions", payload);
  },
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {},
  reducers: {},
});

export default transactionSlice.reducer;
