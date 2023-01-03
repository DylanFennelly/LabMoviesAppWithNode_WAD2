import React, { useContext } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import AddToTVFavouritesIcon from "../cardIcons/addToTVFavourites";
import RemoveFromTVFavouritesIcon from "../cardIcons/removeFromTVFavourites"

import { TVContext } from "../../contexts/tvContext";
import { AuthContext } from "../../contexts/authContext";

const TVHeader = (props) => {
  const tv = props.tv;
  const navigate = useNavigate();
  const context = useContext(TVContext);
  const authContext = useContext(AuthContext)

  //changes icon and function depending on favourites state of tv
  function favouritesState(tv) {
    if (authContext.isAuthenticated){
      if (!context.favourites.includes(tv.id)) {
        return <AddToTVFavouritesIcon tv={tv} />
      } else {
        return <RemoveFromTVFavouritesIcon tv={tv} />
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
        {tv.name}
        <br />
        <span sx={{ fontSize: "1.5rem" }}>{`   "${tv.tagline}"`} </span>
      </Typography>

      {favouritesState(tv)}

      <IconButton aria-label="go forward" onClick={() => navigate(+1)} >
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default TVHeader;