import React from "react";
import PageTemplate from "../components/templateFantasyMoviePage";
import FantasyMovieForm from "../components/fantasyMovieForm";

const AddFantasyMoviePage = (props) => {
  return (
    <PageTemplate movie={null}>
      <FantasyMovieForm />
    </PageTemplate>
  );
};

export default AddFantasyMoviePage;