import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modalSlice";

export const store = () => configureStore({
  reducer: {
    modals: modalSlice,
  },
});

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']