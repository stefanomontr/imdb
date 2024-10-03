import MovieList from "./MovieList.tsx";
import classes from "./Movies.module.css";
import border from "../utils/css-utils.ts";
import ResultBar from "./ResultBar.tsx";
import {useContext, useEffect, useState} from "react";
import Page from "../dtos/Page.ts";
import Movie from "../dtos/Movie.ts";
import SearchContext from "./SearchContext.tsx";
import fetchFromBackendApi from "../utils/fetch-utils.ts";

export default function SearchResults() {
  const [movies, setMovies] = useState({} as Page<Movie>);
  const {content, ...pageInfo} = movies;
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
    <div className={classes.advancedSearch__resultsContainer + border()}>
      <ResultBar pageInfo={pageInfo}/>
      <MovieList movies={movies} />
    </div>
  );
}