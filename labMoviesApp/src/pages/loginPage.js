import React from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateLoginPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'


const LoginPage = (props) => {

  return (
    <PageTemplate
    />
  );
};
export default LoginPage;