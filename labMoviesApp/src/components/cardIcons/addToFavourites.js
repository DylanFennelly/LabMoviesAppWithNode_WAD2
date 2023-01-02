import React, { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

const AddToFavouritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext)

  const handleAddToFavourites = (e) => {
    e.preventDefault();
    context.addToFavourites(movie.id)
    context.loadFavourites()
  };

  return (
    <IconButton aria-label="add to favorites" onClick={handleAddToFavourites}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavouritesIcon;