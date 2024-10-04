import classes from "./Movies.module.css";
import border from "../utils/css-utils.ts";
import Page from "../dtos/Page.ts";
import Movie from "../dtos/Movie.ts";

export interface ResultCountProps {
  pageInfo: Omit<Page<Movie>, "content">
}

export default function ResultCount(props: ResultCountProps) {
  const renderResultCount = () => {
    if (props.pageInfo.pageable) {
      const lastResult = props.pageInfo.pageable.offset + props.pageInfo.numberOfElements;
      const total = props.pageInfo.totalElements;
      return `0 - ${lastResult <= total ? lastResult : total} of ${total}`;
    }
    return false;
  }

  return (
    <div className={classes.advancedSearch__resultCount + border()}>
      {renderResultCount()}
    </div>
  );
}