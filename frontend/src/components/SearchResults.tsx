import MovieList from "./MovieList.tsx";
import classes from "./Movies.module.css";
import border from "../utils/css-utils.ts";
import ResultBar from "./ResultBar.tsx";
import {useContext, useEffect, useState} from "react";
import Page from "../dtos/Page.ts";
import Movie from "../dtos/Movie.ts";
import SearchContext from "./SearchContext.tsx";
import fetchFromBackendApi from "../utils/fetch-utils.ts";
import ProgressiveLoading from "./ProgressiveLoading.tsx";

export default function SearchResults() {
  const [moviePage, setMoviePage] = useState({} as Page<Movie>);
  const {content, ...pageInfo} = moviePage;
  const { searchCriteria } = useContext(SearchContext);

  useEffect(() => {
    fetchFromBackendApi<Page<Movie>>("movies/search", {
      method: "POST",
      body: JSON.stringify(searchCriteria),
      headers: new Headers({
        "Content-Type": "application/json",
        "Accept": "application/json"
      })
    }).then(newPage => {
      // if this is the first page
      if (newPage.first) {
        setMoviePage(newPage);
      } else {
        setMoviePage(prevPage => ({
          ...newPage,
          content: [...prevPage.content, ...newPage.content]
        }));
      }
    });
  }, [searchCriteria]);

  const canLoadMore = moviePage.pageable &&
    moviePage.pageable.offset + moviePage.numberOfElements < moviePage.totalElements;

  return (
    <div className={classes.advancedSearch__resultsContainer + border()}>
      <ResultBar pageInfo={pageInfo}/>
      <MovieList movies={moviePage.content || []} />
      <ProgressiveLoading canLoadMore={canLoadMore} />
    </div>
  );
}