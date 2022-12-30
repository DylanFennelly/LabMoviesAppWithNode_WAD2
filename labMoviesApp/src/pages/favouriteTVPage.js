import React, { useContext } from "react";
import PageTemplate from "../components/templateTVListPage";
import { TVContext } from "../contexts/tvContext";
import { useQueries } from "react-query";
import { getTV } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromTVFavourites from "../components/cardIcons/removeFromTVFavourites";

const FavouriteTVPage = () => {
  const { favourites: tvIds } = useContext(TVContext);

  // Create an array of queries and run in parallel.
  const favouriteTVQueries = useQueries(
    tvIds.map((tvId) => {
      return {
        queryKey: ["tv", { id: tvId }],
        queryFn: getTV,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = favouriteTVQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const tv = favouriteTVQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });

  const toDo = () => true;

  return (
    <PageTemplate
      title="Favourite TV Series"
      tvs={tv}
      action={(tv) => {
        return (
          <>
            <RemoveFromTVFavourites tv={tv} />
            {/* <WriteReview movie={movie} /> */}
          </>
        );
      }}
    />
  );
};

export default FavouriteTVPage;