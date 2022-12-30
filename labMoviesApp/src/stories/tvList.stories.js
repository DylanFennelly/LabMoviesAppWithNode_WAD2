import React from "react";
import TVList from "../components/tvList";
import SampleTV from "./sampleTVData";
import { MemoryRouter } from "react-router";
import AddToTVFavouritesIcon from "../components/cardIcons/addToTVFavourites";
import Grid from "@mui/material/Grid";
import TVContextProvider from "../contexts/tvContext";

export default {
  title: "Discover TV Page/TVList",
  component: TVList,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <TVContextProvider>{Story()}</TVContextProvider>,
  ],
};

export const Basic = () => {
  const tvs = [
    { ...SampleTV, id: 1 },
    { ...SampleTV, id: 2 },
    { ...SampleTV, id: 3 },
    { ...SampleTV, id: 4 },
    { ...SampleTV, id: 5 },
  ];
  return (
    <Grid container spacing={5}>
      <TVList
        tvs={tvs}
        action={(tv) => <AddToTVFavouritesIcon tv={tv} />}
      />
    </Grid>
  );
};
Basic.storyName = "Default";
