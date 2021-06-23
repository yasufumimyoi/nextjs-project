import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movie";
import userReducer from "./user";

export default configureStore({
  reducer: {
    movie: movieReducer,
    user: userReducer,
  },
});
