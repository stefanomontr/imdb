import MovieList from "./MovieList.tsx";
import classes from "./Movies.module.css";
import border from "../utils/css-utils.ts";
import ResultBar from "./ResultBar.tsx";

export default function SearchResults() {
  return (
    <div className={classes.advancedSearch__resultsContainer + border()}>
      <ResultBar />
      <MovieList />
    </div>
  );
}