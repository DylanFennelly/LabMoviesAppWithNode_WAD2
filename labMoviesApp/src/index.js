import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import UpcomingPage from "./pages/upcomingMoviesPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import MustWatchMoviesPage from "./pages/mustWatchMoviesPage";
import TopMoviesPage from "./pages/topMoviesPage";
import DiscoverTVPage from "./pages/discoverTVPage"
import TVDetailsPage from "./pages/tvDetailsPage"
import TVReviewPage from "./pages/tvReviewPage";
import TVContextProvider from "./contexts/tvContext";
import FavouriteTVPage from "./pages/favouriteTVPage";
import PopularActorsPage from "./pages/popularActorsPage";
import ActorsContextProvider from "./contexts/actorsContext";
import ActorDetailsPage from "./pages/actorDetailsPage";
import FavouriteActorsPage from "./pages/favouriteActorsPage";
import FantasyMoviesPage from "./pages/fantasyMoviesPage"
import FantasyMoviesContextProvider from "./contexts/fantasyMoviesContext";
import AddFantasyMoviePage from "./pages/addFantasyMoviePage";
import FantasyMovieDetailsPage from "./pages/fantasyMovieDetailsPage";
import LoginPage from "./pages/loginPage";
import AuthContextProvider from "./contexts/authContext";
import SignUpPage from "./pages/signupPage";
import PrivateRoute from "./privateRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <AuthContextProvider>
        <MoviesContextProvider>
          <TVContextProvider>
            <ActorsContextProvider>
              
              <FantasyMoviesContextProvider>
              <SiteHeader />
                  <Routes>
                    <Route exact path="/movies/favourites" element={ <PrivateRoute><FavouriteMoviesPage /> </PrivateRoute>} />
                    <Route path="/movies/:id" element={<MoviePage />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                    <Route path="/reviews/:id" element={<MovieReviewPage />} />
                    <Route path="/movies/upcoming" element={<UpcomingPage />} />
                    <Route path="/reviews/form" element={<AddMovieReviewPage />} />
                    <Route path="/movies/mustwatch" element={<PrivateRoute><MustWatchMoviesPage /></PrivateRoute> } />
                    <Route path="/movies/top" element={<TopMoviesPage />} />
                    <Route path="/tv" element={<DiscoverTVPage />} />
                    <Route path="/tv/:id" element={<TVDetailsPage />} />
                    <Route path="/tv/reviews/:id" element={<TVReviewPage />} />
                    <Route path="/tv/favourites" element={<PrivateRoute><FavouriteTVPage /></PrivateRoute> } />
                    <Route path="/actors" element={<PopularActorsPage />} />
                    <Route path="/actors/:id" element={<ActorDetailsPage />} />
                    <Route path="/actors/favourites" element={<PrivateRoute><FavouriteActorsPage /> </PrivateRoute>} />
                    <Route path="/movies/fantasy" element={<FantasyMoviesPage />} />
                    <Route path="/movies/fantasy/new" element={<AddFantasyMoviePage />} />
                    <Route path="/movies/fantasy/:id" element={<FantasyMovieDetailsPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                  </Routes>
                </FantasyMoviesContextProvider>
            </ActorsContextProvider>
          </TVContextProvider>
        </MoviesContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"))
rootElement.render(<App />);