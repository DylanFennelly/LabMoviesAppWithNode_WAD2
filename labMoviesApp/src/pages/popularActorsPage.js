import React from "react";
import { getPopularActors } from "../api/movie-api";
import PageTemplate from '../components/templateActorListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToActorFavouritesIcon from '../components/cardIcons/addToActorFavourites'


const PopularActorsPage = (props) => {

  const { data, error, isLoading, isError } = useQuery('popularActor', getPopularActors)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }
  const actors = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favourites = actors.filter(m => m.favourite)
  localStorage.setItem('favourites', JSON.stringify(favourites))
  const addToFavourites = (actorId) => true

  return (
    <PageTemplate
      title="Discover Actors"
      actors={actors}
      action={(actor) => {
        return <AddToActorFavouritesIcon actor={actor} />
      }}
    />
  );
};
export default PopularActorsPage;