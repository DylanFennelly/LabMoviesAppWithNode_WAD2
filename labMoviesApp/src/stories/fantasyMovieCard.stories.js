import React from "react";
import FantasyMovieCard from "../components/fantasyMovieCard";
import SampleFantasy from "./sampleFantasy";
import { MemoryRouter } from "react-router";
import FantasyContextProvider from "../contexts/fantasyMoviesContext";

export default {
  title: "Fantasy Movie List/FantasyCard",
  component: FantasyMovieCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <FantasyContextProvider>{Story()}</FantasyContextProvider>,
  ],
};

export const Basic = () => {
  return (
    <FantasyMovieCard
      movie={SampleFantasy}
      taging={(fantasy) => null}
    />
  );
};
Basic.storyName = "Default";
