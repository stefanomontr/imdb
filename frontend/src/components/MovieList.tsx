import MovieCell from "./MovieCell.tsx";
import Page from "../dtos/Page.ts";
import Movie from "../dtos/Movie.ts";
import {useContext, useEffect, useState} from "react";
import SearchContext from "./SearchContext.tsx";
import fetchFromBackendApi from "../utils/fetch-utils.ts";

export default function MovieList() {
  const [movies, setMovies] = useState({} as Page<Movie>);
  const {searchCriteria} = useContext(SearchContext);

  useEffect(() => {
    fetchFromBackendApi<Page<Movie>>("movies/search", {
      method: "POST",
      body: JSON.stringify(searchCriteria),
      headers: new Headers({
        "Content-Type": "application/json",
        "Accept": "application/json"
      })
    }).then(moviePage => setMovies(moviePage));
  }, [searchCriteria]);

  return (
    <div>
      {movies.content?.map(movie => <MovieCell key={movie.id} movie={movie}/>)}
    </div>
  );
}