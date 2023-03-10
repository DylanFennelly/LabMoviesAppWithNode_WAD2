import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, Controller } from "react-hook-form";
import { FantasyMoviesContext } from "../../contexts/fantasyMoviesContext";
import { useNavigate } from "react-router-dom";
import styles from "./styles";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { getGenres } from "../../api/movie-api";
import { useQuery } from "react-query";
import Spinner from '../spinner'
import Fab from "@mui/material/Fab";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { ActorContext } from "../../contexts/actorsContext";

const FantasyMovieForm = () => {
  const defaultValues = {
    author: "",
    review: "",
    agree: false,
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm(defaultValues);
  const navigate = useNavigate();
  const context = useContext(FantasyMoviesContext);
  const actorContext = useContext(ActorContext)
  const [id, setId] = useState(0);
  const [actor, setActor] = useState(null)
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedActors, setSelectedActors] = useState([]);
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("")
  const [open, setOpen] = React.useState(false);

  console.error = console.warn = () => { };

  const { data, error, isLoading, isError } = useQuery("fantasyGenres", getGenres);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const genres = data;

  //https://stackoverflow.com/questions/16215771/how-to-open-select-file-dialog-via-js
  var imageSelect = document.createElement('input');
  imageSelect.type = 'file';

  imageSelect.onchange = e => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);


    reader.onload = readerEvent => {
      var content = readerEvent.target.result
      setImage(content)
      setImageName(file.name)
    }
  }


  //https://beta.reactjs.org/learn/updating-arrays-in-state
  function addToSelectedGenres(id) {
    //if id is 0, no genre has been selected
    if (!(id === 0)) {
      const elemMatch = genres[genres.indexOf(genres.find(e => e.id === parseInt(id)))]

      let matchFound = false;
      let i = 0;

      for (i = 0; i < selectedGenres.length; i++) {
        if (selectedGenres[i].id === elemMatch.id) {
          matchFound = true;
        }
      }
      if (!matchFound) {
        setSelectedGenres([...selectedGenres, elemMatch])
      }
    }
  }

  function addToSelectedActors(actor) {
    if (!selectedActors.includes(actor)) {
      setSelectedActors([...selectedActors, actor])
    }

  }

  const handleSnackClose = (event) => {
    setOpen(false);
    navigate("/movies/fantasy");
  };

  const onSubmit = (fantasy) => {
    let id = 0;
    let idClear = false;

    //ensuring id is not doubly written
    while (!idClear) {
      if (context.fantasy.find(e => e.id === id) === undefined) {
        idClear = true;
      } else {
        id++;
      }
    }

    fantasy.id = id
    fantasy.genres = selectedGenres;
    fantasy.actors = selectedActors;
    fantasy.image = image;
    const reg = new RegExp("([0-9]{4})-([0-9]{2})-([0-9]{2})");
    if (reg.test(fantasy.release_date)) {
      if (fantasy.genres.length != 0) {

        context.addToFantasyMovies(fantasy);
        setOpen(true);
      } else {
        window.alert("No genres have been selected! \nPlease selected at least one genre to proceed")
      }
    } else {
      alert("Release date does not match the required format.\nFormat: YYYY-MM-DD")
    }
  };

  //updates the genre select box with latest selected genre
  function genreBoxName(g) {
    if (g.length > 0) {
      return g[g.length - 1].name
    }
  }

  return (
    <Box component="div" sx={styles.root}>
      <Snackbar
        sx={styles.snack}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={handleSnackClose}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={handleSnackClose}
        >
          <Typography variant="h4">
            Fantasy movie submitted!
          </Typography>
        </Alert>
      </Snackbar>
      <form sx={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="title"
          control={control}
          rules={{ required: "Title is required" }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              sx={{ width: "40ch" }}
              variant="outlined"
              margin="normal"
              required
              onChange={onChange}
              value={value}
              id="title"
              label="Movie title"
              autoFocus
            />
          )}
        />
        {errors.title && (
          <Typography variant="h6" component="p" style={{ color: 'red' }}>
            {errors.title.message}
          </Typography>
        )}
        <Controller
          name="overview"
          control={control}
          rules={{
            required: "Overview cannot be empty.",
            minLength: { value: 10, message: "Overview is too short" },
          }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={value}
              onChange={onChange}
              label="Overview text"
              id="overview"
              multiline
              minRows={10}
            />
          )}
        />
        {errors.overview && (
          <Typography variant="h6" component="p" style={{ color: 'red' }}>
            {errors.overview.message}
          </Typography>
        )}
        <div>
          <Controller
            control={control}
            name="genres"
            render={({ field: { onChange, value } }) => (
              <TextField
                id="select-genre"
                select
                variant="outlined"
                label="Genre Select"
                value={genreBoxName(selectedGenres)}
                onChange={e => setId(e.target.value)}
                helperText="Select one or more genres"
              >
                {genres.map((option) => (
                  <MenuItem key={option.id} value={option.id} >
                    {option.name}
                  </MenuItem>
                ))}

              </TextField>
            )}
          />
          <Button
            variant="contained"
            color="primary"
            sx={styles.genre}
            onClick={() => addToSelectedGenres(id)}>
            Add genre
          </Button>
          {selectedGenres.map(genre => (
            <Fab onClick={() => (
              setSelectedGenres(
                selectedGenres.filter(g =>
                  g.id !== genre.id)
              )
            )}
              color="secondary"
              variant="extended"
              sx={styles.fab}
              key={genre.id}
            >
              <RemoveCircleIcon />
              {genre.name}
            </Fab>
          ))}

        </div>
        <Controller
          name="release_date"
          control={control}
          rules={{ required: "Date is required." }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              sx={{ width: "40ch" }}
              variant="outlined"
              margin="normal"
              inputProps={{ pattern: "([0-9]{4})\/([0-9]{2})\/([0-9]{2})" }}
              required
              onChange={onChange}
              value={value}
              id="date"
              label="Release Date (YYYY-MM-DD)"
              autoFocus
            />
          )}
        />
        {errors.release_date && (
          <Typography variant="h6" component="p" style={{ color: 'red' }}>
            {errors.release_date.message}
          </Typography>
        )}

        <div>
          <div>
            <Controller
              control={control}
              name="actors"
              render={({ field: { onChange, value } }) => (
                <TextField
                  id="select-actor"
                  select
                  variant="outlined"
                  label="Select Cast Members"
                  value={genreBoxName(selectedGenres)}
                  onChange={e => setActor(e.target.value)}
                  helperText="Select one or more cast members from favourite actors"
                >
                  {actorContext.favouritesWithNames.map((option) => (
                    <MenuItem key={option.id} value={option} >
                      {option.name}
                    </MenuItem>
                  ))}

                </TextField>
              )}
            />
            <Button
              variant="contained"
              color="primary"
              sx={styles.genre}
              onClick={() => addToSelectedActors(actor)}>
              Add actor
            </Button>
            {selectedActors.map(actor => (
              <Fab onClick={() => (
                setSelectedActors(
                  selectedActors.filter(g =>
                    g !== actor)
                )
              )}
                color="secondary"
                variant="extended"
                sx={styles.fab}
                key={actor.id}
              >
                <RemoveCircleIcon />
                {actor.name}
              </Fab>
            ))}

          </div>
          <Controller
            name="company"
            control={control}
            rules={{ required: "Production company is required" }}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextField
                sx={{ width: "40ch" }}
                variant="outlined"
                margin="normal"
                required
                onChange={onChange}
                value={value}
                id="company"
                label="Production Company"
              />
            )}
          />
          {errors.company && (
            <Typography variant="h6" component="p" style={{ color: 'red' }}>
              {errors.company.message}
            </Typography>
          )}
        </div>

        <div >
          <Box sx={styles.imageBox}>
            <Button
              variant="contained"
              color="primary"
              sx={styles.imageButton}
              onClick={() => imageSelect.click()}>
              Add image
            </Button>
            <Typography sx={styles.imageText}>
              {imageName}
            </Typography>
          </Box>
        </div>




        <Box sx={styles.buttons}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={styles.submit}
          >
            Submit
          </Button>
          <Button
            type="reset"
            variant="contained"
            color="secondary"
            sx={styles.submit}
            onClick={() => {
              reset({

              });
            }}
          >
            Reset
          </Button>
        </Box>
      </form>
    </Box>
  );

};

export default FantasyMovieForm;