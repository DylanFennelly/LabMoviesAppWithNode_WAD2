import React from "react";
import FavouriteActorCard from "../components/favouriteActorCard";
import SampleActor from "./sampleActorData";
import { MemoryRouter } from "react-router";
import ActorContextProvider from "../contexts/actorsContext";
import AddToActorFavouritesIcon from "../components/cardIcons/addToActorFavourites";

export default {
  title: "Actor List/FavouriteActorCard",
  component: FavouriteActorCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <ActorContextProvider>{Story()}</ActorContextProvider>,
  ],
};

export const Basic = () => {
  return (
    <FavouriteActorCard
      actor={SampleActor}
      action={(actor) => <AddToActorFavouritesIcon actor={actor} />}
      taging={(actor) => null}
    />
  );
};
Basic.storyName = "Default";

export const Exceptional = () => {
  const sampleNoProfile = { ...SampleActor, profile_path: undefined };
  return (
    <FavouriteActorCard
      actor={sampleNoProfile}
      action={(actor) => <AddToActorFavouritesIcon actor={actor} />}
      taging={(actor) => null}
    />
  );
};
Exceptional.storyName = "exception";
