import SearchSorting from "./SearchSorting.tsx";
import ResultCount from "./ResultCount.tsx";
import Page from "../dtos/Page.ts";
import Movie from "../dtos/Movie.ts";
import classes from "../css/MovieSearch.module.css";

export interface ResultBarProps {
  pageInfo: Omit<Page<Movie>, "content">
}

export default function ResultBar(props: ResultBarProps) {
  return (
    <div className={classes.search__resultBar}>
      <ResultCount pageInfo={props.pageInfo}/>
      <SearchSorting />
    </div>
  );
}