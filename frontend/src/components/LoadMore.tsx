import Loader from "./Loader.tsx";
import classes from "../css/MovieSearch.module.css";

export interface LoadMoreProps {
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}

export default function LoadMore(props: LoadMoreProps) {
  if (!props.isFetchingNextPage) {
    return (
      <div className={classes.search__loadMoreContainer}>
        {
          props.hasNextPage &&
          <div className={classes.search__loadMore} onClick={props.fetchNextPage}>
            LOAD MORE
          </div>
        }
      </div>
    );
  } else {
    return <Loader />;
  }
}