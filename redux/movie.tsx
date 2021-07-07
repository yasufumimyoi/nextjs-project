import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { firebase } from "../firebase/config";
import { RootState } from "../redux/store";
import { Status } from "../types/index";

export type MovieData = {
  id: string;
  title: string;
  image: string;
  averageRating: string;
  episodeLength: number;
  status: Status;
  createdAt: string;
};

type State = {
  movies: MovieData[];
  movieList: MovieData[];
  keyword: string;
  status: string;
};

const initialState: State = {
  movies: [],
  movieList: [],
  keyword: "",
  status: "",
};

export const fetchMovieData = createAsyncThunk(
  "movie/fetchMovieData",
  async (uid: string, { dispatch }) => {
    try {
      const dataRef = await firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .collection("lists")
        .get();
      if (!dataRef.empty) {
        await firebase
          .firestore()
          .collection("users")
          .doc(uid)
          .collection("lists")
          .orderBy("createdAt", "desc")
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              const data = doc.data() as MovieData;
              dispatch(setList(data));
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const fetchMoreMovieData = createAsyncThunk(
  "movie/fetchMoreMovieData",
  async (url: string, { getState }) => {
    try {
      const request = await fetch(url);
      const { data } = await request.json();
      const { keyword } = (getState() as RootState).movie;

      const validTitles = data
        .filter(
          ({
            attributes: {
              titles: { ja_jp },
              averageRating,
            },
          }: {
            attributes: { titles: { ja_jp: string }; averageRating: string };
          }) => ja_jp && averageRating
        )
        .map(
          ({
            id,
            attributes: {
              titles: { ja_jp },
              posterImage: { original },
              averageRating,
            },
          }: {
            id: string;
            attributes: {
              titles: { ja_jp: string };
              posterImage: { original: string };
              averageRating: string;
            };
          }) => {
            return {
              id,
              title: ja_jp,
              image: original,
              averageRating,
            };
          }
        );

      if (keyword) {
        return validTitles
          .map(
            ({
              id,
              title,
              image,
              averageRating,
            }: {
              id: string;
              title: string;
              image: string;
              averageRating: string;
            }) => {
              if (title.indexOf(keyword) > 0) {
                return {
                  id,
                  title,
                  image,
                  averageRating,
                };
              }
            }
          )
          .filter((video: MovieData) => video);
      } else {
        return validTitles.map(
          ({
            id,
            title,
            image,
            averageRating,
          }: {
            id: string;
            title: string;
            image: string;
            averageRating: string;
          }) => ({
            id,
            title,
            image,
            averageRating,
          })
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    addList: (state: State, action: PayloadAction<MovieData>) => {
      state.movieList = [action.payload, ...state.movieList];
    },
    removeList: (state: State, action: PayloadAction<string>) => {
      state.movieList = state.movieList.filter(
        (movie) => movie.id !== action.payload
      );
    },
    setList: (state: State, action: PayloadAction<MovieData>) => {
      state.movieList.push(action.payload);
    },
    resetList: (state: State) => {
      state.movieList = [];
    },
    getMore: (state: State, action: PayloadAction<MovieData[]>) => {
      state.movies = [...state.movies, ...action.payload];
    },
    resetMore: (state: State) => {
      state.movies = [];
    },
    addMovies: (state: State, action: PayloadAction<MovieData[]>) => {
      state.movies = [...action.payload];
    },
    setKeyword: (state: State, action: PayloadAction<string>) => {
      state.keyword = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovieData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchMovieData.fulfilled, (state) => {
      if (state.movieList.length === 0) {
        state.movieList = [];
      }
      state.status = "success";
    });
    builder.addCase(fetchMovieData.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(fetchMoreMovieData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchMoreMovieData.fulfilled, (state, action) => {
      state.movies = [...state.movies, ...action.payload];
      state.status = "success";
    });
    builder.addCase(fetchMoreMovieData.rejected, (state) => {
      state.status = "rejected";
    });
  },
});

export const {
  addList,
  removeList,
  setList,
  resetList,
  getMore,
  resetMore,
  addMovies,
  setKeyword,
} = movieSlice.actions;

export default movieSlice.reducer;
