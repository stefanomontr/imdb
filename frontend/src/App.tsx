import {useEffect, useState} from 'react'
import './App.css'
import Page from "./dtos/Page.ts";
import Movie from "./dtos/Movie.ts";
import fetchFromBackendApi from "./utils/fetch-utils.ts";
import SearchCriteria from "./dtos/SearchCriteria.ts";

function App() {

  const [movies, setMovies] = useState({} as Page<Movie>);
  const [searchCriteria, setSearchCriteria] = useState({
    title: "Sun",
    paginationFilter: {
      offset: 0,
      limit: 10
    }
  } as SearchCriteria);

  useEffect(() => {
    fetchFromBackendApi<Page<Movie>>("movies/search", {
      method: "POST",
      body: JSON.stringify(searchCriteria),
      headers: new Headers({
        "Content-Type": "application/json",
        "Accept": "application/json"
      })
    }).then(moviePage => setMovies(moviePage));
  }, []);

  return (<div>
    {movies.content?.map(movie => <p key={movie.id}>{movie.title}</p>)}
  </div>);
}

export default App
