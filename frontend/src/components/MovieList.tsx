import MovieCell from "./MovieCell.tsx";
import Movie from "../dtos/Movie.ts";

export interface MovieListProps {
  movies: Movie[];
}

export default function MovieList(props: MovieListProps) {
  return (
    <div>
      {props.movies?.map(movie => <MovieCell key={movie.id} movie={movie}/>)}
    </div>
  );
}