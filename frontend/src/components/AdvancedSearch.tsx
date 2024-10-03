import {useEffect, useState} from "react";
import Page from "../dtos/Page.ts";
import Movie from "../dtos/Movie.ts";
import fetchFromBackendApi from "../utils/fetch-utils.ts";
import SearchCriteria from "../dtos/SearchCriteria.ts";
import classes from "./Movies.module.css";
import border from "../utils/css-utils.ts";
import MovieList from "./MovieList.tsx";
import FilterList from "./FilterList.tsx";

export default function AdvancedSearch() {
  const [movies, setMovies] = useState({} as Page<Movie>);
  const [searchCriteria, setSearchCriteria] = useState({
    title: "Sun",
    paginationFilter: {
      offset: 0,
      limit: 10
    }
  } as SearchCriteria);

  // TODO const [searchCriteria, dispatchSearchCriteria] = useReducer

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
    <section>

      <div className={classes.advancedSearch + border()}>
        <h1 className={classes.advancedSearch__title}>Advanced Title Search</h1>
        <div className={classes.advancedSearch__filters + border()}>
          <FilterList searchCriteria={searchCriteria} setSearchCriteria={setSearchCriteria} />
        </div>
        <div className={classes.advancedSearch__movies + border()}>
          <MovieList movies={movies} />
        </div>
      </div>

    </section>
  );
}