import React, { useContext, useEffect, useState } from "react";
import { getFavourites, addFavourites, removeFavourite, getMustWatch, addMustWatch, removeMustWatch } from "../api/movie-api";
import { AuthContext } from "./authContext";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favourites, setFavourites] = useState([])
  const [myReviews, setMyReviews] = useState({})
  const [mustWatch, setMustWatch] = useState([])

  const context = useContext(AuthContext)

  function loadFavourites(){
    getFavourites(context.userName).then(result =>{
      setFavourites(result)
    })
  }

  const addToFavourites = (movidID) => {
    addFavourites(context.userName, movidID)
    loadFavourites()
  };

  const removeFromFavourites = (movieID) => {
    // setFavourites(favourites.filter(
    //   (mId) => mId !== movie.id
    // ))
    // loadFavourites()
    removeFavourite(context.userName, movieID)
    loadFavourites()

  };

  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review })
  };

  function loadMustWatch(){
    getMustWatch(context.userName).then(result =>{
      setMustWatch(result)
    })
  }

  const addToMustWatch = (movieID) => {
    addMustWatch(context.userName, movieID)
    loadMustWatch()
  };

  const removeFromMustWatch = (movieID) => {
    removeMustWatch(context.userName, movieID)
    loadMustWatch()
  };


  return (
    <MoviesContext.Provider
      value={{
        favourites,
        setFavourites,
        addToFavourites,
        removeFromFavourites,
        addReview,
        addToMustWatch,
        mustWatch,
        removeFromMustWatch,
        myReviews,
        loadFavourites,
        loadMustWatch
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;