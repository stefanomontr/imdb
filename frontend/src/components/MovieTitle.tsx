import classes from "../css/MovieSearch.module.css";

export interface MovieTitleProps {
  imdbUrl: string;
  movieTitle: string;
}

export default function MovieTitle(props: MovieTitleProps) {
  return (
    <div>
      <a
        className={classes.search__movieTitle}
        href={props.imdbUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {
          props.movieTitle.length <= 60
            ? props.movieTitle
            : `${props.movieTitle.substring(0, 60)}...`
        }
      </a>
    </div>
  );
}