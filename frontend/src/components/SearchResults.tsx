import MovieList from "./MovieList.tsx";
import classes from "../css/MovieSearch.module.css";
import ResultBar from "./ResultBar.tsx";
import {useContext} from "react";
import SearchContext from "./SearchContext.tsx";
import ProgressiveLoading from "./ProgressiveLoading.tsx";
import {keepPreviousData, useInfiniteQuery} from "@tanstack/react-query";
import {paginatedSearch} from "../utils/fetch-utils.ts";
import Page from "../dtos/Page.ts";
import Movie from "../dtos/Movie.ts";

import {PageInfo} from "../dtos/PageInfo.ts";

export default function SearchResults() {
  const { searchCriteria } = useContext(SearchContext);

  const {
    data,
    isPlaceholderData,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery<Page<Movie>, Error>({
    getNextPageParam: (lastPage, ..._args) => {
      if (lastPage.last) {
        return null;
      }
      return lastPage.pageable.pageNumber + 1;
    },
    initialPageParam: 0,
    queryKey: ["movies", searchCriteria],
    queryFn: ({ signal, pageParam }) => paginatedSearch({ signal, pageParam, searchCriteria}),
    enabled: query => !query.isStale(),
    placeholderData: keepPreviousData
  });

  const extractPageInfo = (moviePage: Page<Movie> | undefined) => {
    if (moviePage) {
      const {content, ...pageInfo} = moviePage;
      return pageInfo;
    }
    return {} as PageInfo;
  }

  const moviePages = (data?.pages || []);
  const lastPage = data?.pages[data.pages.length - 1];
  const pageInfo = extractPageInfo(lastPage);

  const renderError = () =>
    isError && <>{error?.message || "Error in retrieving movies"}</>;
  const renderLoading = () =>
    data && (isPlaceholderData || isFetchingNextPage) && "LOADING NEW DATA...";

  return (
    <div className={classes.search__resultsContainer}>
      <ResultBar pageInfo={pageInfo}/>
      {renderError()}
      {renderLoading()}
      <MovieList movies={moviePages.reduce((movies, currPage) => [
        ...movies,
        ...currPage.content
      ], [] as Movie[])} />
      <ProgressiveLoading
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      />
    </div>
  );
}