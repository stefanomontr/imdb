import MovieList from "./MovieList.tsx";
import classes from "./Movies.module.css";
import border from "../utils/css-utils.ts";
import ResultBar from "./ResultBar.tsx";
import {useRef} from "react";
import Page from "../dtos/Page.ts";
import Movie from "../dtos/Movie.ts";

export default function SearchResults() {
  const pageRef = useRef({} as Omit<Page<Movie>, "content">);

  return (
    <div className={classes.advancedSearch__resultsContainer + border()}>
      <ResultBar pageInfo={pageRef.current}/>
      <MovieList ref={pageRef} />
    </div>
  );
}