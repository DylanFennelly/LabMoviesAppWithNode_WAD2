import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import VideocamIcon from '@mui/icons-material/Videocam';
import EventIcon from '@mui/icons-material/Event';
import TodayIcon from '@mui/icons-material/Today';
import AlbumIcon from '@mui/icons-material/Album';
import TvIcon from '@mui/icons-material/Tv';
import TVReviews from "../tvReviews"


const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};
const chip = { margin: 0.5 };

const TVDetails = ({ tv }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {tv.overview}
      </Typography>

      <Paper
        component="ul"
        sx={root}
      >
        <li>
          <Chip label="Genres" sx={chip} color="primary" />
        </li>
        {tv.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={chip} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={root}>
        <Chip icon={<AccessTimeIcon />} label={`${tv.episode_run_time[0]} min./EP`} />
        <Chip
          icon={<AlbumIcon />}
          label={`Seasons: ${tv.number_of_seasons}`}
        />
        <Chip
          icon={<VideocamIcon />}
          label={`Episodes: ${tv.number_of_episodes}`}
        />
        <Chip
          icon={<StarRate />}
          label={`Rating: ${tv.vote_average} (${tv.vote_count} total ratings)`}
        />
      </Paper>
      <Paper component="ul" sx={root}>
        <Chip icon={<TvIcon />} label={`Status: ${tv.status}`} />
        <Chip icon={<TodayIcon />} label={`First Aired: ${tv.first_air_date}`} />
        <Chip icon={<EventIcon />} label={`Last Aired: ${tv.last_air_date}`} />
      </Paper>
      <Paper
        component="ul"
        sx={root}
      >
        <li>
          <Chip label="Production Countries" sx={chip} color="primary" />
        </li>
        {tv.production_countries.map((c) => (
          <li key={c.name}>
            <Chip label={c.name} sx={chip} />
          </li>
        ))}
      </Paper>
      <Paper
        component="ul"
        sx={root}
      >
        <li>
          <Chip label="Networks" sx={chip} color="primary" />
        </li>
        {tv.networks.map((c) => (
          <li key={c.name}>
            <Chip label={c.name} sx={chip} />
          </li>
        ))}
      </Paper>

      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <TVReviews tv={tv} />
      </Drawer>
    </>
  );
};
export default TVDetails;