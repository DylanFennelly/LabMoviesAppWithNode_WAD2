import React, { useContext, useEffect, useState } from "react";
import { getFavourites, addFavourites, removeFavourite } from "../api/movie-api";
import { AuthContext } from "./authContext";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favourites, setFavourites] = useState([])
  const [myReviews, setMyReviews] = useState({})
  const [mustWatch, setMustWatch] = useState([])

  const context = useContext(AuthContext)

  // useEffect(() => {
  //   loadFavourites()
  // }, [])

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

  const addToMustWatch = (movie) => {
    let newMustWatch = [...mustWatch];
    if (!mustWatch.includes(movie.id)) {
      newMustWatch.push(movie.id);
    }
    setMustWatch(newMustWatch);
  };

  const removeFromMustWatch = (movie) => {
    setMustWatch(mustWatch.filter(
      (mId) => mId !== movie.id
    ))
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
        loadFavourites
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;