//needed to resolve issue with "known_for" movies not being obtainable data for the actorsDetails api query

import React from "react";
import Actor from "../favouriteActorCard";
import Grid from "@mui/material/Grid";

const FavouriteActorList = ({ actors, action }) => {
  let actorCards = actors.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Actor key={m.id} actor={m} action={action} />
    </Grid>
  ));
  return actorCards;
};

export default FavouriteActorList;