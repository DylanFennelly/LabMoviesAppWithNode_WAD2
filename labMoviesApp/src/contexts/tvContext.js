import React, { useState, useContext } from "react";
import { getTVFavourites, addTVFavourites, removeTVFavourite } from "../api/movie-api";
import { AuthContext } from "./authContext";

export const TVContext = React.createContext(null);

const TVContextProvider = (props) => {
  const [favourites, setFavourites] = useState([])

  const context = useContext(AuthContext)

  function loadFavourites(){
    getTVFavourites(context.userName).then(result =>{
      setFavourites(result)
    })
  }

  const addToFavourites = (tvID) => {
    addTVFavourites(context.userName, tvID)
    loadFavourites()
  };

  // We will use this function in a later section
  const removeFromFavourites = (tvID) => {
    removeTVFavourite(context.userName, tvID)
    loadFavourites()
  };

  return (
    <TVContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        loadFavourites
      }}
    >
      {props.children}
    </TVContext.Provider>
  );
};

export default TVContextProvider;