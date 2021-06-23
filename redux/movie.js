import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movieList: [],
  },
  reducers: {
    addList: (state, action) => {
      state.movieList = [action.payload, ...state.movieList];
    },
    removeList: (state, action) => {
      state.movieList = state.movieList.filter(
        (movie) => movie.id !== action.payload
      );
    },
    setList: (state, action) => {
      state.movieList.push(action.payload);
    },
    resetList: (state) => {
      state.movieList = [];
    },
  },
});

export const { addList, removeList, setList, resetList } = movieSlice.actions;

export default movieSlice.reducer;
