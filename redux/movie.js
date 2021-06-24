import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { firebase } from "../firebase/config";

export const fetchMovieData = createAsyncThunk(
  "movie/fetchMovieData",
  async (uid, { dispatch }) => {
    try {
      await firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .collection("lists")
        .orderBy("createdAt", "desc")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            dispatch(setList(doc.data()));
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movieList: [],
    status: false,
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
  extraReducers: {
    [fetchMovieData.pending]: (state) => {
      state.status = false;
    },
    [fetchMovieData.fulfilled]: (state, action) => {
      state.movieList.push(action.payload);
      state.status = true;
    },
    [fetchMovieData.rejected]: (state) => {
      state.status = false;
    },
  },
});

export const { addList, removeList, setList, resetList } = movieSlice.actions;

export default movieSlice.reducer;
