import React, { useState, useContext } from "react";
import { getActorFavourites, addActorFavourites, removeActorFavourite } from "../api/movie-api";
import { AuthContext } from "./authContext";

export const ActorContext = React.createContext(null);

const ActorContextProvider = (props) => {
  const [favourites, setFavourites] = useState([])
  //for displaying in fantasyMovie with name
  const [favouritesWithNames, setFavouritesWithNames] = useState([])

  const context = useContext(AuthContext)

  function loadFavourites(){
    getActorFavourites(context.userName).then(result =>{
      setFavourites(result)
      setFavouritesWithNames(result)
    })
  }

  const addToFavourites = (actorID) => {
    addActorFavourites(context.userName, actorID)
    loadFavourites()
  };

  const removeFromFavourites = (actorID) => {
    removeActorFavourite(context.userName, actorID)
    loadFavourites()

    const i = favouritesWithNames.findIndex(a => a.id === actorID);
    if (i > -1) {
      favouritesWithNames.splice(i, 1)
      setFavouritesWithNames(favouritesWithNames)
    }
  };

  return (
    <ActorContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        favouritesWithNames,
        loadFavourites
      }}
    >
      {props.children}
    </ActorContext.Provider>
  );
};

export default ActorContextProvider;