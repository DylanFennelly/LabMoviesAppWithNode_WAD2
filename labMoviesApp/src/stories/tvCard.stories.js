import React from "react";
import TVCard from "../components/tvCard";
import SampleTV from "./sampleTVData";
import { MemoryRouter } from "react-router";
import TVContextProvider from "../contexts/tvContext";
import AddToTVFavouritesIcon from "../components/cardIcons/addToTVFavourites";

export default {
  title: "Discover TV Page/TVCard",
  component: TVCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <TVContextProvider>{Story()}</TVContextProvider>,
  ],
};

export const Basic = () => {
  return (
    <TVCard
      tv={SampleTV}
      action={(tv) => <AddToTVFavouritesIcon tv={tv} />}
      taging={(tv) => null}
    />
  );
};
Basic.storyName = "Default";

export const Exceptional = () => {
  const sampleNoPoster = { ...SampleTV, poster_path: undefined };
  return (
    <TVCard
      tv={sampleNoPoster}
      action={(tv) => <AddToTVFavouritesIcon tv={tv} />}
      taging={(tv) => null}
    />
  );
};
Exceptional.storyName = "exception";
