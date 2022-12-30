import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterTVCard";
import TVList from "../tvList";
import Grid from "@mui/material/Grid";

function TVListPageTemplate({ tvs, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [languageFilter, setLanguageFilter] = useState("All")
  const genreId = Number(genreFilter);

  let displayedTVs = tvs
    .filter((m) => {
      return m.name.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => {
      return m.vote_average >= ratingFilter;
    })
    .filter((m) => {
      return languageFilter !== "All" ? m.original_language === languageFilter : true;
    })

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value)
    else if (type === "rating") setRatingFilter(value)
    else if (type === "language") setLanguageFilter(value)
    else setGenreFilter(value);
  };

  return (
    <Grid container sx={{ padding: '20px' }}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
          />
        </Grid>
        <TVList action={action} tvs={displayedTVs}></TVList>
      </Grid>
    </Grid>
  );
}
export default TVListPageTemplate;