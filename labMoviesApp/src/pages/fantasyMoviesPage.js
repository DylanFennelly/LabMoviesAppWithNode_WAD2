import React, { useContext } from "react";
import PageTemplate from "../components/templateFantasyMovieListPage";
import { FantasyMoviesContext } from "../contexts/fantasyMoviesContext";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'


const FantasyMoviesPage = (props) => {
  const context = useContext(FantasyMoviesContext);
  const movies = context.fantasy

  const toDo = () => true;

  return (
    <PageTemplate
      title="Fantasy Movies"
      movies={movies}

    />
  );
};
export default FantasyMoviesPage;