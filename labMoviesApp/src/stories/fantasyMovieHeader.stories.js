import React from "react";
import FantasyHeader from "../components/fantasyMovieHeader";
import SampleFantasy from "./sampleFantasy";
import { MemoryRouter } from "react-router";
import FantasyContextProvider from "../contexts/fantasyMoviesContext";

export default {
  title: "Fantasy Movie Details Page/FatansyMovieHeader",
  component: FantasyHeader,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <FantasyContextProvider>{Story()}</FantasyContextProvider>,
  ],
};

export const Basic = () => <FantasyHeader movie={SampleFantasy} />;

Basic.storyName = "Details Page";

export const Form = () => <FantasyHeader movie={null} />;

Form.storyName = "Fantasy Movie Form";
