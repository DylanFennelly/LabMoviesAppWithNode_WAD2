import React from "react";
import FantasyList from "../components/fantasyMovieList";
import SampleFantasy from "./sampleFantasy";
import { MemoryRouter } from "react-router";
import Grid from "@mui/material/Grid";
import FantasyContextProvider from "../contexts/fantasyMoviesContext";

export default {
  title: "Fantasy Movie List/FantasyMovieList",
  component: FantasyList,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <FantasyContextProvider>{Story()}</FantasyContextProvider>,
  ],
};

export const Basic = () => {
  const movies = [
    { ...SampleFantasy, id: 1 },
    { ...SampleFantasy, id: 2 },
    { ...SampleFantasy, id: 3 },
    { ...SampleFantasy, id: 4 },
    { ...SampleFantasy, id: 5 },
  ];
  return (
    <Grid container spacing={5}>
      <FantasyList
        movies={movies}
      />
    </Grid>
  );
};
Basic.storyName = "Default";
