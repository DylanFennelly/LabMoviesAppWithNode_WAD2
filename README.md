# Assignment 2 - Web API.

Name: Dylan Fennelly

## Features.

 + Get Upcoming Movies: - Gets upcoming movies from the TMDB API.

 + Get Top Rated Movies: - Gets top rated movies from the TMDB API.

 + Get Popular TV series: - Gets popular TV series from the TMDB API.

 + Get Popular Actors: - Gets popular actors from the TMDB API.

 + Get TV Genres: - Gets a list of TV series genres from the TMDB API.

 + Delete Movie Favourites: - Remove a movie from a user's favourite movies list.

 + Get/Post/Delete Movie Must Watch: - Get, Add, and Remove a movie from a user's must watch movies list.

 + Get/Post/Delete TV Favourites: - Get, Add, and Remove a TV series from a user's favourite TV series list.

 + Get/Post/Delete Actor Favourites: - Get, Add, and Remove an actor from a user's favourite actors list.

## Installation Requirements

Software requirements: 

 + Node.js version 18.12.1

 + MongoDB Community Server version 4.4.18

After project is downloaded from GitHub and extracted, the following commands must be run:
 
+ Within the LabMoviesAppWithNode_WAD2\labMoviesApp directory:
  + ```npm install```
  + ```npm start```

+ Within the LabMoviesAppWithNode_WAD2\labMoviesAPI directory:
  + ```npm init```
  + ```npm install --save-dev babel-cli babel-preset-env nodemon eslint babel-eslint```
  + ```npm install --save dotenv express```
  + ```npm install -save mongoose```
  + ```npm install --save express-session```
  + ```npm install --save passport passport-jwt jsonwebtoken bcrypt-nodejs```
  + ```npm install express-async-handler --save```
  + ```npm install --save uniqid```
  + ```npm install -s node-fetch@2```
  + ```npm start```

+ ```mongod```, the command to start up the MongoDB server, must also be running in a terminal.



## API Configuration
Describe any configuration that needs to take place before running the API. For example, creating an ``.env`` and what variables to put in it. Give an example of how this might be structured/done.
**REMEMBER: DON'T PUT YOUR OWN USERNAMES/PASSWORDS/AUTH KEYS IN THE README OR ON GITHUB,** just placeholders as indicated below:

+ Within the LabMoviesAppWithNode_WAD2\labMoviesApp directory, create the following file named ```.env```

```bat
REACT_APP_TMDB_KEY=>Your TMDB API key<
FAST_REFRESH=false
```

+ Within the LabMoviesAppWithNode_WAD2\labMoviesAPI directory, create the following file named ```.env```

```bat
NODE_ENV=development
PORT=8080
HOST=localhost
MONGO_DB=mongodb://127.0.0.1:27017/dylanfennelly_wad2_assign2
SEED_DB=True
SECRET=>Your JWT Secret<
TMDB_KEY=>Your TMDB API key<
```


## API Design

|  |  GET | POST | PUT | DELETE
| -- | -- | -- | -- | -- 
| /api/movies |Gets a list of movies | N/A | N/A | N/A
| /api/movies/{movieid} | Get a Movie | N/A | N/A | N/A
| /api/movies/{movieid}/reviews | Get all reviews for movie | Create a new review for Movie | N/A | N/A  
| /api/movies/tmdb/upcoming | Get upcoming movies from TMDB API | N/A | N/A | N/A
| /api/movies/tmdb/top | Get top rated movies from TMDB API | N/A | N/A | N/A
| /api/movies/tmdb/tv | Get popular tv series from TMDB API | N/A | N/A | N/A
| /api/movies/tmdb/actors | Get popular actors from TMDB API | N/A | N/A | N/A
| /api/genres/ | Get list of genres | N/A | N/A | N/A
| /api/genres/tv | Get list of tv genres from TMDB API | N/A | N/A | N/A
| /api/users | Get list of all users | Authenitcates a user | N/A | N/A
| /api/users?action=regsiter | N/A | Creates a new user | N/A | N/A
| /api/users/:id | N/A| N/A | Updates user info | N/A
| /api/users/:userName/favourites | Get user's favourite movies | Add new favourite | N/A | Remove favourite
| /api/users/:userName/tvFavourites | Get user's favourite tv seriess | Add new favourite | N/A | Remove favourite
| /api/users/:userName/actorFavourites | Get user's favourite actors | Add new favourite | N/A | Remove favourite
| /api/users/:userName/mustwatch | Get user's must watch movies | Add new must watch | N/A | Remove must watch


## Security and Authentication

Authentication is implemented through JavaScript Web Token and Passport. The following routes are private and require authentication to access:

 + /movies/favourites
 + /movies/mustwatch
 + /tv/favourites
 + /actors/favourites
 + /movies/fantasy
 + /movies/fantasy/new
 + /movies/fantasy/:id

## Integrating with React App

Describe how you integrated your React app with the API. Perhaps link to the React App repo and give an example of an API call from React App. For example: 

The API was primarily integrated with the React app through the use of authentication and favourites. Many of the sites features, such as favourite movies/tv series/actors, must watch movies, and fantasy movies now all require the user to be logged in and authenticated. Favourites and must watch lists are now exclusive to each user and are persisted across visits to the website. Some API calls, such as discover movies or movie genres are now carried out directly through the Node API, while others like upcoming movies and popular actors query the TMDB api through the node backend.

~~~Javascript
export const getPopularActors = () => {
    return fetch(
       '/api/movies/tmdb/actors'
    ).then(res => res.json());
  };

export const addTVFavourites = (username, tvId) => {
    return fetch('/api/users/'+username+'/tvFavourites',{
        headers: {
        'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({id: tvId})
    }).then(res => res.json())
}
~~~
