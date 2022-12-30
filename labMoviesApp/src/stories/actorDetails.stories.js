import React from "react";
import ActorDetails from "../components/actorDetails";
import SampleActor from "./sampleActorData";
import { MemoryRouter } from "react-router";
import ActorContextProvider from "../contexts/actorsContext";

export default {
  title: "Actor Details Page/ActorDetails",
  component: ActorDetails,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <ActorContextProvider>{Story()}</ActorContextProvider>,
  ],
};

export const Basic = () => <ActorDetails actor={SampleActor} />;

Basic.storyName = "NoDeathDay";

export const Alternate = () => {
  const sampleWithDeath = { ...SampleActor, deathday: "2022-12-31" };
  return (
    <ActorDetails actor={sampleWithDeath} />
  )
};

Alternate.storyName = "WithDeathDay"