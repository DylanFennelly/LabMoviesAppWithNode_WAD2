import React, { useContext, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'
import { AuthContext } from "../contexts/authContext";

import { MoviesContext } from "../contexts/moviesContext";
import { getMovies } from "../api/movie-api";


const HomePage = (props) => {

  const { data, error, isLoading, isError } = useQuery('discover', getMovies)
  const authContext = useContext(AuthContext)

  const context = useContext (MoviesContext)

  useEffect(() => {
    if (authContext.isAuthenticated){
      console.log("home page load")
      context.loadFavourites()
    }
  }, [])  //https://css-tricks.com/run-useeffect-only-once/

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