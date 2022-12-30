import React, { useState } from "react";

export const ActorContext = React.createContext(null);

const ActorContextProvider = (props) => {
  const [favourites, setFavourites] = useState([])
  //for displaying in fantasyMovie with name
  const [favouritesWithNames, setFavouritesWithNames] = useState([])

  const addToFavourites = (actor) => {
    let newFavourites = [...favourites];
    let newFavouritesWithName = [...favouritesWithNames]
    if (!favourites.includes(actor.id)) {
      newFavourites.push(actor.id);
      newFavouritesWithName.push({
        id: actor.id,
        name: actor.name
      })
    }
    setFavourites(newFavourites);
    setFavouritesWithNames(newFavouritesWithName)
  };

  const removeFromFavourites = (actor) => {
    setFavourites(favourites.filter(
      (tId) => tId !== actor.id
    ))

    const i = favouritesWithNames.findIndex(a => a.id === actor.id);
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
        favouritesWithNames
      }}
    >
      {props.children}
    </ActorContext.Provider>
  );
};

export default ActorContextProvider;