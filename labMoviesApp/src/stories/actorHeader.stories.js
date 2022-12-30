import React from "react";
import ActorHeader from "../components/headerActor";
import Sampleactor from "./sampleActorData";
import { MemoryRouter } from "react-router";
import ActorContextProvider from "../contexts/actorsContext";

export default {
  title: "Actor Details Page/ActorHeader",
  component: ActorHeader,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <ActorContextProvider>{Story()}</ActorContextProvider>
  ],
};

export const Basic = () => <ActorHeader actor={Sampleactor} />;

Basic.storyName = "Default";
