import MovieList from "./MovieList.tsx";
import classes from "./Movies.module.css";
import border from "../utils/css-utils.ts";
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
    isPending,
    isError,
    error,
    hasNextPage,
    fetchNextPage
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

  const extractPageInfo = (page: Page<Movie>) => {
    const {content, ...pageInfo} = page;
    return pageInfo;
  }

  const lastPage = data && data.pages[data.pages.length-1];
  const pageInfo = lastPage && extractPageInfo(lastPage) || {} as PageInfo;

  let searchResults;

  // new data
  if (data && !isPlaceholderData) {
    searchResults = <MovieList movies={data.pages.reduce((movies, currPage) => [
      ...movies, ...currPage.content
    ], [] as Movie[])} />;
  }
  // pending with no prev data
  if (isPending && !data) {
    searchResults = <MovieList movies={[]} />;
  }
  // prev data while fetching new data
  if (data && isPlaceholderData) {
    searchResults = <>LOADING ...<MovieList movies={data.pages.reduce((movies, currPage) => [
      ...movies, ...currPage.content
    ], [] as Movie[])} /></>;
  }
  if (isError) {
    searchResults = <>{error?.message || "Error in retrieving movies"}</>
  }

  return (
    <div className={classes.advancedSearch__resultsContainer + border()}>
      <ResultBar pageInfo={pageInfo || {} as PageInfo}/>
      {searchResults}
      <ProgressiveLoading
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      />
    </div>
  );
}