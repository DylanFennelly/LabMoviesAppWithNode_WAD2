import React, { useContext, useEffect } from "react";
import { getDiscoverTV } from "../api/movie-api";
import PageTemplate from '../components/templateTVListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToTVFavouritesIcon from '../components/cardIcons/addToTVFavourites'

import { AuthContext } from "../contexts/authContext";
import { TVContext } from "../contexts/tvContext";


const DiscoverTVPage = (props) => {

  const { data, error, isLoading, isError } = useQuery('discoverTV', getDiscoverTV)
  const authContext = useContext(AuthContext)

  const context = useContext (TVContext)

  useEffect(() => {
    if (authContext.isAuthenticated){
      console.log("tv page load")
      context.loadFavourites()
    }
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }
  const tvs = data.results;

  return (
    <PageTemplate
      title="Discover TV Series"
      tvs={tvs}
      action={(tv) => {
        if (authContext.isAuthenticated)
          return <AddToTVFavouritesIcon tv={tv} />
      }}
    />
  );
};
export default DiscoverTVPage;