//interaction with backend api
export const login = (username, password) => {
    return fetch('/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    }).then(res => res.json())
};

export const signup = (username, password) => {
    return fetch('/api/users?action=register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    }).then(res => res.json())
};

export const getFavourites = (username) => {
    // console.log("getFavourites")
    return fetch('/api/users/'+username+'/favourites').then(res => res.json())
}

export const addFavourites = (username, movieId) => {
    return fetch('/api/users/'+username+'/favourites',{
        headers: {
        'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({id: movieId})
    }).then(res => res.json())
}

export const removeFavourite = (username, movieId) =>  {
    return fetch('/api/users/'+username+'/favourites',{
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'delete',
      body: JSON.stringify({id: movieId})
    }).then(res => res.json())
  }

  export const getMovies = () => {
    return fetch(
       '/api/movies'
    ).then(res => res.json());
  };

  export const getGenres = () => {
    return fetch(
       '/api/genres'
    ).then(res => res.json());
  };

  export const getUpcomingMovies = () => {
    return fetch(
       '/api/movies/tmdb/upcoming'
    ).then(res => res.json());
  };

  export const getTopMovies = () => {
    return fetch(
       '/api/movies/tmdb/top'
    ).then(res => res.json());
  };

  export const getDiscoverTV = () => {
    return fetch(
       '/api/movies/tmdb/tv'
    ).then(res => res.json());
  };

  export const getTVGenres = () => {
    return fetch(
        '/api/genres/tv'
    ).then(res => res.json());
  };

  export const getPopularActors = () => {
    return fetch(
       '/api/movies/tmdb/actors'
    ).then(res => res.json());
  };


  export const getTVFavourites = (username) => {
    // console.log("getFavourites")
    return fetch('/api/users/'+username+'/tvFavourites').then(res => res.json())
}

export const addTVFavourites = (username, tvId) => {
    return fetch('/api/users/'+username+'/tvFavourites',{
        headers: {
        'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({id: tvId})
    }).then(res => res.json())
}

export const removeTVFavourite = (username, tvId) =>  {
    return fetch('/api/users/'+username+'/tvFavourites',{
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'delete',
      body: JSON.stringify({id: tvId})
    }).then(res => res.json())
  }


  export const getActorFavourites = (username) => {
    // console.log("getFavourites")
    return fetch('/api/users/'+username+'/actorFavourites').then(res => res.json())
}

export const addActorFavourites = (username, actorId) => {
    return fetch('/api/users/'+username+'/ActorFavourites',{
        headers: {
        'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({id: actorId})
    }).then(res => res.json())
}

export const removeActorFavourite = (username, actorId) =>  {
    return fetch('/api/users/'+username+'/actorFavourites',{
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'delete',
      body: JSON.stringify({id: actorId})
    }).then(res => res.json())
  }

  export const getMustWatch = (username) => {
    // console.log("getFavourites")
    return fetch('/api/users/'+username+'/mustwatch').then(res => res.json())
}

export const addMustWatch = (username, movieId) => {
    return fetch('/api/users/'+username+'/mustwatch',{
        headers: {
        'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({id: movieId})
    }).then(res => res.json())
}

export const removeMustWatch = (username, movieId) =>  {
    return fetch('/api/users/'+username+'/mustwatch',{
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'delete',
      body: JSON.stringify({id: movieId})
    }).then(res => res.json())
  }

