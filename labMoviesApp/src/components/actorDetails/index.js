import React from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import EventIcon from '@mui/icons-material/Event';
import TodayIcon from '@mui/icons-material/Today';
import HomeIcon from '@mui/icons-material/Home';
import WcIcon from '@mui/icons-material/Wc';


const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};


const ActorDetails = ({ actor }) => {

  //only printing deathday is actor is dead
  function isDead(actor) {
    if (actor.deathday !== null) {
      return <Chip icon={<EventIcon />} label={`Died: ${actor.deathday}`} />
    }
  }

  //gender is stored as number value, 1 for female and 2 for male. This translates that number value into a string value
  (actor.gender === 1) ? actor.gender = "  Female" : actor.gender = "  Male"

  return (
    <>
      <Typography variant="h5" component="h3">
        Biography
      </Typography>

      <Typography variant="h6" component="p">
        {actor.biography}
      </Typography>

      <Paper
        component="ul"
        sx={root}
      >
        <Chip
          icon={<TodayIcon />}
          label={`Born: ${actor.birthday}`} />
        {isDead(actor)}
        <Chip
          icon={<HomeIcon />}
          label={actor.place_of_birth} />

      </Paper>
      <Paper component="ul" sx={root}>
        <Chip
          icon={<WcIcon />}
          label={actor.gender} />
      </Paper>
    </>
  );
};
export default ActorDetails;