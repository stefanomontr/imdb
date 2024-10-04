import {useContext} from "react";
import SearchContext from "./SearchContext.tsx";

export interface ProgressiveLoadingProps {
  canLoadMore: boolean;
}

export default function ProgressiveLoading(props: ProgressiveLoadingProps) {
  const { searchCriteria, setPagination } = useContext(SearchContext);

  // @ts-expect-error `e` is generic browser event
  const onLoadMoreHandler = e => {
    setPagination({
      ...searchCriteria.paginationFilter,
      pageNumber: searchCriteria.paginationFilter.pageNumber + 1
    });
  }

  return (
    <>
      {
        props.canLoadMore &&
        <div onClick={onLoadMoreHandler}>
          Load more...
        </div>
      }
    </>
  );
}