import React, { useContext } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import AddToActorFavouritesIcon from "../cardIcons/addToActorFavourites";
import RemoveFromActorFavouritesIcon from "../cardIcons/removeFromActorFavourites";

import { ActorContext } from "../../contexts/actorsContext";
import { AuthContext } from "../../contexts/authContext";

const ActorHeader = (props) => {
  const actor = props.actor;
  const navigate = useNavigate();
  const context = useContext(ActorContext);
  const authContext = useContext(AuthContext)

  //changes icon and function depending on favourites state of actor
  function favouritesState(actor) {
    if (authContext.isAuthenticated){
      if (!context.favourites.includes(actor.id)) {
        return <AddToActorFavouritesIcon actor={actor} />
      } else {
        return <RemoveFromActorFavouritesIcon actor={actor} />
      }
    }
  }

  return (
    <Paper
      component="div"
      sx={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        padding: 1.5,
        margin: 0,
      }}
    >
      <IconButton aria-label="go back" onClick={() => navigate(-1)} >
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      <Typography variant="h4" component="h3">
        {actor.name}
      </Typography>

      {favouritesState(actor)}

      <IconButton aria-label="go forward" onClick={() => navigate(+1)} >
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default ActorHeader;