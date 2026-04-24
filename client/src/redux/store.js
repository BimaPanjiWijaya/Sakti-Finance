import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import transactionReducer from "./slices/transactionSlice";
import insightReducer from "./slices/insightSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    transaction: transactionReducer,
    insight: insightReducer,
  },
});
