import React, { useContext } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import AddToFavouritesIcon from "../cardIcons/addToFavourites";
import RemoveFromFavouritesIcon from "../cardIcons/removeFromFavourites"

import { MoviesContext } from "../../contexts/moviesContext";

const MovieHeader = (props) => {
  const movie = props.movie;
  const navigate = useNavigate();
  const context = useContext(MoviesContext);

  //changes icon and function depending on favourites state of movie
  function favouritesState(movie) {
    if (!context.favourites.includes(movie.id)) {
      return <AddToFavouritesIcon movie={movie} />
    } else {
      return <RemoveFromFavouritesIcon movie={movie} />
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

      <Typography variant="h4" component="h3" align="center">
        <b>{movie.title}</b>
        <a href={movie.homepage}>
          <HomeIcon color="primary" />
        </a>
        <br />
        <span sx={{ fontSize: "1.5rem" }}>{`   "${movie.tagline}"`} </span>
      </Typography>

      {favouritesState(movie)}
      <IconButton aria-label="go forward" onClick={() => navigate(+1)} >
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default MovieHeader;