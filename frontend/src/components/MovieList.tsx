import MovieCell from "./MovieCell.tsx";
import Page from "../dtos/Page.ts";
import Movie from "../dtos/Movie.ts";
import {forwardRef, Ref, useContext, useEffect, useImperativeHandle, useState} from "react";
import SearchContext from "./SearchContext.tsx";
import fetchFromBackendApi from "../utils/fetch-utils.ts";

const MovieList = forwardRef(function MovieList(_props: void, ref: Ref<Omit<Page<Movie>, "content">>) {
  const [movies, setMovies] = useState({} as Page<Movie>);
  const {searchCriteria} = useContext(SearchContext);

  useImperativeHandle(ref, () => movies as Omit<Page<Movie>, "content">, [movies]);

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
});

export default MovieList;