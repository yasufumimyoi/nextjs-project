import { createContext, useReducer, useEffect } from "react";
import { AppReducer } from "./AppReducer";
import {
  readFirestore,
  writeFirestore,
  removeFirestore,
} from "../firebase/config";

const initialState = {
  movieList: [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const addList = (movie) => {
    dispatch({ type: "ADD_LIST", payload: movie });
    writeFirestore(movie);
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
    removeFirestore(id);
  };

  // useEffect(() => {
  //   readFirestore().then((data) => {
  //     for (let i = 0; i < data.length; i++) {
  //       dispatch({ type: "SET_ITEM", payload: data[i] });
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   for (let i = 0; i < state.movieList.length; i++) {
  //     writeFirestore(state.movieList[i].movie);
  //   }

  // }, [state]);

  // useEffect(() => {
  //   if (typeof window !== "undefined" && sessionStorage.length > 0) {
  //     let data = JSON.parse(sessionStorage.getItem("movieList"));

  //     for (let i = 0; i < data.length; i++) {
  //       addList(data[i]);
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   sessionStorage.setItem("movieList", JSON.stringify(state.movieList));
  // }, [state]);

  return (
    <GlobalContext.Provider
      value={{
        movieList: state.movieList,
        favoriteList: state.favoriteList,
        addList,
        removeItem,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
