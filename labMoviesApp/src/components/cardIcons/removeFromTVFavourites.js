import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { TVContext } from "../../contexts/tvContext";

const RemoveFromTVFavouritesIcon = ({ tv }) => {
  const context = useContext(TVContext);

  const handleRemoveFromFavourites = (e) => {
    e.preventDefault();
    context.removeFromFavourites(tv.id);
    context.loadFavourites()
  };
  return (
    <IconButton
      aria-label="remove from favorites"
      onClick={handleRemoveFromFavourites}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromTVFavouritesIcon;