import SearchSorting from "./SearchSorting.tsx";
import ResultCount from "./ResultCount.tsx";
import border from "../utils/css-utils.ts";
import Page from "../dtos/Page.ts";
import Movie from "../dtos/Movie.ts";

export interface ResultBarProps {
  pageInfo: Omit<Page<Movie>, "content">
}

export default function ResultBar(props: ResultBarProps) {
  return (
    <div className={border()}>
      <ResultCount pageInfo={props.pageInfo}/>
      <SearchSorting />
    </div>
  );
}