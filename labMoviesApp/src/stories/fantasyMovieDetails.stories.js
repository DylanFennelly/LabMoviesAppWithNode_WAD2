import React from "react";
import FantasyDetails from "../components/fantasyMovieDetails";
import SampleFantasy from "./sampleFantasy";
import { MemoryRouter } from "react-router";
import FantasyContextProvider from "../contexts/fantasyMoviesContext";

export default {
  title: "Fantasy Movie Details Page/FantasyMovieDetails",
  component: FantasyDetails,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <FantasyContextProvider>{Story()}</FantasyContextProvider>,
  ],
};

export const Basic = () => <FantasyDetails movie={SampleFantasy} />;

Basic.storyName = "Default";
