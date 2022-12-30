import React from "react";
import { getDiscoverTV } from "../api/tmdb-api";
import PageTemplate from '../components/templateTVListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToTVFavouritesIcon from '../components/cardIcons/addToTVFavourites'


const DiscoverTVPage = (props) => {

  const { data, error, isLoading, isError } = useQuery('discoverTV', getDiscoverTV)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }
  const tvs = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favourites = tvs.filter(m => m.favourite)
  localStorage.setItem('favourites', JSON.stringify(favourites))
  const addToFavourites = (tvId) => true

  return (
    <PageTemplate
      title="Discover TV Series"
      tvs={tvs}
      action={(tv) => {
        return <AddToTVFavouritesIcon tv={tv} />
      }}
    />
  );
};
export default DiscoverTVPage;