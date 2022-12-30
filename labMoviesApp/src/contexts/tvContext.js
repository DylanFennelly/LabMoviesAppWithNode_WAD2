import React, { useState } from "react";

export const TVContext = React.createContext(null);

const TVContextProvider = (props) => {
  const [favourites, setFavourites] = useState([])

  const addToFavourites = (tv) => {
    let newFavourites = [...favourites];
    if (!favourites.includes(tv.id)) {
      newFavourites.push(tv.id);
    }
    setFavourites(newFavourites);
  };

  // We will use this function in a later section
  const removeFromFavourites = (tv) => {
    setFavourites(favourites.filter(
      (tId) => tId !== tv.id
    ))
  };

  return (
    <TVContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
      }}
    >
      {props.children}
    </TVContext.Provider>
  );
};

export default TVContextProvider;