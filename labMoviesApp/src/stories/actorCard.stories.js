import React from "react";
import ActorCard from "../components/actorCard";
import SampleActor from "./sampleActorData";
import { MemoryRouter } from "react-router";
import ActorContextProvider from "../contexts/actorsContext";
import AddToActorFavouritesIcon from "../components/cardIcons/addToActorFavourites";

export default {
  title: "Actor List/ActorCard",
  component: ActorCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <ActorContextProvider>{Story()}</ActorContextProvider>,
  ],
};

export const Basic = () => {
  return (
    <ActorCard
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
    <ActorCard
      actor={sampleNoProfile}
      action={(actor) => <AddToActorFavouritesIcon actor={actor} />}
      taging={(actor) => null}
    />
  );
};
Exceptional.storyName = "exception";
