import Movie from "../dtos/Movie.ts";
import styles from "./Movies.module.css";

export interface MovieProps {
  movie: Movie
}

export default function MovieCell(props: MovieProps) {

  return (
    <div className={styles.advancedSearch__movie}>
      <div className={`${styles.advancedSearch__moviePoster} ${styles.border}`}>image</div>
      <div className={`${styles.advancedSearch__movieInfo} ${styles.border}`}>
        <div>{props.movie.title}</div>
        <div>{props.movie.year} & {props.movie.runtimeMinutes}</div>
        <div>{props.movie.rating} based on {props.movie.numVotes} reviews</div>
      </div>
    </div>
  );
}