import MovieList from "./MovieList.tsx";
import classes from "../css/MovieSearch.module.css";
import ResultBar from "./ResultBar.tsx";
import {useContext} from "react";
import SearchContext from "./SearchContext.tsx";
import LoadMore from "./LoadMore.tsx";
import {keepPreviousData, useInfiniteQuery} from "@tanstack/react-query";
import {paginatedSearch} from "../utils/fetch-utils.ts";
import Page from "../dtos/Page.ts";
import Movie from "../dtos/Movie.ts";

import {PageInfo} from "../dtos/PageInfo.ts";
import Loader from "./Loader.tsx";

export default function SearchResults() {
  const { searchCriteria } = useContext(SearchContext);

  const {
    data,
    isLoading,
    isPlaceholderData,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery<Page<Movie>, Error>({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getNextPageParam: (lastPage, ..._args) => {
      if (lastPage.last) {
        return null;
      }
      return lastPage.pageable.pageNumber + 1;
    },
    initialPageParam: 0,
    queryKey: ["movies", searchCriteria],
    queryFn: ({ signal, pageParam }) => paginatedSearch({ signal, pageParam, searchCriteria}),
    // enabled: query => !query.isStale(),
    placeholderData: keepPreviousData
  });

  const extractPageInfo = (moviePage: Page<Movie> | undefined) => {
    if (moviePage) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {content, ...pageInfo} = moviePage;
      return pageInfo;
    }
    return {} as PageInfo;
  }

  const moviePages = (data?.pages || []);
  const movieList = moviePages.reduce((movies, currPage) => [
    ...movies,
    ...currPage.content
  ], [] as Movie[]);

  const lastPage = data?.pages[data.pages.length - 1];
  const pageInfo = extractPageInfo(lastPage);

  const renderError = () =>
    isError && <>{error?.message || "Error in retrieving movies"}</>;
  const renderLoading = () =>
    (isLoading || isPlaceholderData) && <Loader />;

  return (
    <div className={classes.search__resultsContainer}>
      <ResultBar pageInfo={pageInfo}/>
      {renderError()}
      {renderLoading()}
      <MovieList
        movies={movieList} />
      <LoadMore
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      />
    </div>
  );
}