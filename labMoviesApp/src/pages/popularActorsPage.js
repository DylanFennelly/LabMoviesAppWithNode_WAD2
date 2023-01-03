import React, { useContext, useEffect } from "react";
import { getPopularActors } from "../api/movie-api";
import PageTemplate from '../components/templateActorListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToActorFavouritesIcon from '../components/cardIcons/addToActorFavourites'

import { ActorContext } from "../contexts/actorsContext";
import { AuthContext } from "../contexts/authContext";


const PopularActorsPage = (props) => {

  const { data, error, isLoading, isError } = useQuery('popularActor', getPopularActors)
  const authContext = useContext(AuthContext)

  const context = useContext (ActorContext)

  useEffect(() => {
    if (authContext.isAuthenticated){
      console.log("Actor page load")
      context.loadFavourites()
    }
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }
  const actors = data.results;

  return (
    <PageTemplate
      title="Discover Actors"
      actors={actors}
      action={(actor) => {
        if (authContext.isAuthenticated)
        return <AddToActorFavouritesIcon actor={actor} />
      }}
    />
  );
};
export default PopularActorsPage;