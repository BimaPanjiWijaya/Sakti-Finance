import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// 🔹 FETCH TRANSACTIONS
export const fetchTransactions = createAsyncThunk(
  "transaction/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/transactions");
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

// 🔹 ADD TRANSACTION
export const addTransaction = createAsyncThunk(
  "transaction/add",
  async (payload, thunkAPI) => {
    try {
      const { data } = await api.post("/transactions", payload);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

// 🔹 DELETE TRANSACTION
export const deleteTransaction = createAsyncThunk(
  "transaction/delete",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/transactions/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

// 🔹 UPDATE TRANSACTION
export const updateTransaction = createAsyncThunk(
  "transaction/update",
  async ({ id, payload }, thunkAPI) => {
    try {
      const { data } = await api.put(`/transactions/${id}`, payload);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.error = null;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ADD
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      // DELETE
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.list = state.list.filter((t) => t.id !== action.payload);
      })
      // UPDATE
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const index = state.list.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      });
  },
});

export default transactionSlice.reducer;
