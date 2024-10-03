import MovieCell from "./MovieCell.tsx";
import Page from "../dtos/Page.ts";
import Movie from "../dtos/Movie.ts";

export interface MovieListProps {
  movies: Page<Movie>;
}

export default function MovieList(props: MovieListProps) {
  return (<>
    {props.movies.content?.map(movie => <MovieCell key={movie.id} movie={movie}/>)}
  </>);
}