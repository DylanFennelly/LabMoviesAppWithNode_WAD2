import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateTVPage";
import MovieReview from "../components/movieReview";

const TVReviewPage = (props) => {
  let location = useLocation();
  const { tv, review } = location.state;

  return (
    <PageTemplate tv={tv}>
      <MovieReview review={review} />
    </PageTemplate>
  );
};

export default TVReviewPage;