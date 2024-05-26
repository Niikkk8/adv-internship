import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modalSlice";
import userSlice from "./userSlice";
import sidebarSlice from "./sidebarSlice";

export const store = () =>
  configureStore({
    reducer: {
      modals: modalSlice,
      user: userSlice,
      sidebar: sidebarSlice,
    },
  });

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
