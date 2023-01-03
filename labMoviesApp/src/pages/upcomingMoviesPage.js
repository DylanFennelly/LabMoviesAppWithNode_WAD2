import React, { useContext, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/movie-api";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToMustWatchIcon from '../components/cardIcons/addToMustWatch';
import { AuthContext } from "../contexts/authContext";

import { MoviesContext } from "../contexts/moviesContext";

const HomePage = (props) => {
  const { data, error, isLoading, isError } = useQuery('upcoming', getUpcomingMovies)
  const authContext = useContext(AuthContext)

  const context = useContext (MoviesContext)

  useEffect(() => {
    if (authContext.isAuthenticated){
      context.loadMustWatch()
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
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        if (authContext.isAuthenticated)
          return <AddToMustWatchIcon movie={movie} />
      }}
    />
  );
};
export default HomePage;