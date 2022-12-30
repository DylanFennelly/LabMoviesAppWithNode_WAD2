import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";


const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = ({ history }) => {
  const [anchorMovie, setAnchorMovie] = useState(null);
  const [anchorTV, setAnchorTV] = useState(null);
  const [anchorActor, setAnchorActor] = useState(null);
  const [anchorMobile, setAnchorMobile] = useState(null);

  const openMovie = Boolean(anchorMovie);
  const openTV = Boolean(anchorTV);
  const openActor = Boolean(anchorActor);
  const openMobile = Boolean(anchorMobile);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();

  //for separate drop down menus on desktop view
  const movieOptions = [
    { label: "Discover", path: "/" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Top Rated", path: "/movies/top" },
    { label: "Favourites", path: "/movies/favourites" },
    { label: "Must Watch", path: "/movies/mustwatch" },
    { label: "My Fantasy Movies", path: "/movies/fantasy" }
  ]

  const TVOptions = [
    { label: "Discover", path: "/tv" },
    { label: "Favourites", path: "/tv/favourites" },
  ];

  const ActorOptions = [
    { label: "Popular", path: "/actors" },
    { label: "Favourites", path: "/actors/favourites" },
  ];

  const mobileOptions = [
    { label: "Home", path: "/" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Top Rated", path: "/movies/top" },
    { label: "Favourites", path: "/movies/favourites" },
    { label: "Must Watch", path: "/movies/mustwatch" },
    { label: "My Fantasy Movies", path: "/movies/fantasy" },
    { label: "TV Series", path: "/tv" },
    { label: "TV Favourites", path: "/tv/favourites" },
    { label: "Popular Actors", path: "/actors" },
    { label: "Favourite Actors", path: "/actors/favourites" },
  ];

  const handleMenuSelect = (pageURL) => {
    navigate(pageURL, { replace: true });
  };

  const handleMovieMenu = (event) => {
    setAnchorMovie(event.currentTarget);
  };

  const handleMenuTV = (event) => {
    setAnchorTV(event.currentTarget);
  };

  const handleMenuActor = (event) => {
    setAnchorActor(event.currentTarget);
  };

  const handleMobileMenu = (event) => {
    setAnchorMobile(event.currentTarget);
  };

  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            TMDB Client
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            All you ever wanted to know about Movies, TV and more!
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                aria-label="menu-mobile"
                aria-controls="menu-mobile-appbar"
                aria-haspopup="true"
                onClick={handleMobileMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-mobile-appbar"
                anchorEl={anchorMobile}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={openMobile}
                onClose={() => setAnchorMobile(null)}
              >
                {mobileOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              <Button
                id="movie-menu"
                aria-controls="movie-menu-appbar"
                aria-haspopup="true"
                onClick={handleMovieMenu}
                color="inherit">
                Movies
              </Button>
              <Menu
                id="movie-menu-appbar"
                anchorEl={anchorMovie}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={openMovie}
                onClose={() => setAnchorMovie(null)}>
                {movieOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
              <Button
                id="tv-menu"
                aria-controls="tv-menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuTV}
                color="inherit">
                TV
              </Button>
              <Menu
                id="tv-menu-appbar"
                anchorEl={anchorTV}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={openTV}
                onClose={() => setAnchorTV(null)}>
                {TVOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
              <Button
                id="actor-menu"
                aria-controls="actor-menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuActor}
                color="inherit">
                Actors
              </Button>
              <Menu
                id="actor-menu-appbar"
                anchorEl={anchorActor}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={openActor}
                onClose={() => setAnchorActor(null)}>
                {ActorOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;