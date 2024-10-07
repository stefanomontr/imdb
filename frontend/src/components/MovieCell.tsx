import Movie from "../dtos/Movie.ts";
import classes from "../css/MovieSearch.module.css";
import poster from "./../assets/sample-poster.jpg";
import ReviewStar from "./ReviewStar.tsx";
import {formatNumVotes} from "../utils/math-utils.ts";

export interface MovieProps {
  movie: Movie
}

export default function MovieCell(props: MovieProps) {

  const hours = props.movie.runtime && Math.floor(props.movie.runtime / 60);
  const minutes = props.movie.runtime && props.movie.runtime % 60;

  return (
    <div className={classes.search__movie}>
      <div className={`${classes.search__moviePoster}`}>
        <img src={poster} style={{width: "50px"}}/>
      </div>
      <div className={`${classes.search__movieInfo}`}>
        <div>
          <a
            className={classes.search__movieTitle}
            href={`https://www.imdb.com/title/${props.movie.id}/?ref_=sr_t_1`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {
              props.movie.title.length <= 60
                ? props.movie.title
                : `${props.movie.title.substring(0, 60)}...`
            }
          </a>
        </div>
        <div>
          <span className={classes.search__movieYear}>
            {props.movie.year}
          </span>
          <span className={classes.search__movieRuntime}>
            {hours && hours > 0 ? `${hours}h` : ""}
            {minutes && minutes > 0 ? `${minutes}m` : ""}
          </span>
          <span className={classes.search__movieGenre}>
            {props.movie.genres?.toLowerCase().replace(/,/g, ", ")}
          </span>
        </div>
        <div>
          <ReviewStar/>
          <span className={classes.search__movieRating}>
            {props.movie.rating || "--"}
          </span>
          <span className={classes.search__movieReviewNum}>
            {props.movie.numVotes && `(${formatNumVotes(props.movie.numVotes)})`}
          </span>
        </div>
      </div>
    </div>
  );
}