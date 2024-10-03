import classes from "./Movies.module.css";
import border from "../utils/css-utils.ts";
import Page from "../dtos/Page.ts";
import Movie from "../dtos/Movie.ts";

export interface ResultCountProps {
  pageInfo: Omit<Page<Movie>, "content">
}

export default function ResultCount(props: ResultCountProps) {
  const renderResultCount = () => {
    if (props.pageInfo && props.pageInfo.pageable) {
      const firstResult = props.pageInfo.pageable.offset;
      const lastResult = props.pageInfo.pageable.offset + props.pageInfo.pageable.pageSize;
      const total = props.pageInfo.totalElements;
      return `${firstResult} - ${lastResult} of ${total}`;
    }
    return false;
  }

  return (
    <div className={classes.advancedSearch__resultCount + border()}>
      {renderResultCount()}
    </div>
  );
}