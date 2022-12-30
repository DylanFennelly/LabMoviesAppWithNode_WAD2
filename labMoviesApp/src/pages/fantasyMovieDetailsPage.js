import React, { useContext } from "react";
import { useParams } from 'react-router-dom';
import FantasyMovieDetails from "../components/fantasyMovieDetails";
import PageTemplate from "../components/templateFantasyMoviePage";
import { FantasyMoviesContext } from "../contexts/fantasyMoviesContext";


const FantasyMovieDetailsPage = (props) => {
  const { id } = useParams();
  const context = useContext(FantasyMoviesContext);
  const movie = context.fantasy[id]


  return (
    <PageTemplate movie={movie}>
      <FantasyMovieDetails movie={movie} />
    </PageTemplate>
  );
};

export default FantasyMovieDetailsPage;