import classes from "../css/MovieSearch.module.css";

export interface MovieTitleProps {
  imdbUrl: string;
  movieTitle: string;
}

export default function MovieTitle(props: MovieTitleProps) {
  return (
    <div className={classes.search__movieTitle}>
      <a
        className={classes.search__movieTitleLink}
        href={props.imdbUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {props.movieTitle}
      </a>
    </div>
  );
}