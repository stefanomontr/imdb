import Movie from "../dtos/Movie.ts";
import styles from "./Movies.module.css";
import poster from "./../assets/sample-poster.jpg";

export interface MovieProps {
  movie: Movie
}

export default function MovieCell(props: MovieProps) {

  const hours = props.movie.runtimeMinutes && Math.floor(props.movie.runtimeMinutes / 60);
  const minutes = props.movie.runtimeMinutes && props.movie.runtimeMinutes % 60;

  return (
    <div className={styles.advancedSearch__movie}>
      <div className={`${styles.advancedSearch__moviePoster} ${styles.border}`}>
        <img src={poster} style={{ width: "50px"}}/>
      </div>
      <div className={`${styles.advancedSearch__movieInfo} ${styles.border}`}>
        <div>
          <a
            href={`https://www.imdb.com/title/${props.movie.id}/?ref_=sr_t_1`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.movie.title}
          </a>
        </div>
        <div>
          {props.movie.year}
          {hours && hours > 0 ? `${hours}h` : ""}
          {minutes && minutes > 0 ? `${minutes}m` : ""}
        </div>
        <div>{props.movie.rating} based on {props.movie.numVotes} reviews</div>
      </div>
    </div>
  );
}