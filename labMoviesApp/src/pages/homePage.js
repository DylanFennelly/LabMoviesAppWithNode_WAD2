import React, { useContext, useEffect } from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'
import { AuthContext } from "../contexts/authContext";

import { MoviesContext } from "../contexts/moviesContext";


const HomePage = (props) => {

  const { data, error, isLoading, isError } = useQuery('discover', getMovies)
  const authContext = useContext(AuthContext)

  const context = useContext (MoviesContext)

  useEffect(() => {
    if (authContext.isAuthenticated){
      context.loadFavourites()
    }
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }
  const movies = data.results;

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        if (authContext.isAuthenticated)
          return <AddToFavouritesIcon movie={movie} />
      }}
    />
  );
};
export default HomePage;