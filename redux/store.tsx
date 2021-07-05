import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movie";
import userReducer from "./user";

const store = configureStore({
  reducer: {
    movie: movieReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
