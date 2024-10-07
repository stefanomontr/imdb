import MovieCell from "./MovieCell.tsx";
import Movie from "../dtos/Movie.ts";

export interface MovieListProps {
  movies: Movie[];
}

export default function MovieList(props: MovieListProps) {
  return (
    <div>
      {
        props.movies.map((movie, idx) =>
          <MovieCell key={`${movie.id}:${idx}`} movie={movie}/>)
      }
    </div>
  );
}