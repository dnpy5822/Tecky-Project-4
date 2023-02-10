import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./LoginSlice";

export let store = configureStore({
  reducer: {
    login: loginReducer,
  },
});

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
