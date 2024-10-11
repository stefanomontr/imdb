import classes from "../css/MovieSearch.module.css";

interface MovieYearAndGenreProps {
  year?: number;
  runtime?: number;
  genres?: string;
}

export default function MovieInfo(props: MovieYearAndGenreProps) {
  const hours = props.runtime && Math.floor(props.runtime / 60);
  const minutes = props.runtime && props.runtime % 60;

  return (
    <div>
      <span className={classes.search__movieYear}>
        {props.year}
      </span>
      <span className={classes.search__movieRuntime}>
        {hours && hours > 0 ? `${hours}h` : ""}
        {minutes && minutes > 0 ? `${minutes}m` : ""}
      </span>
      <span className={classes.search__movieGenre}>
        {props.genres?.toLowerCase().replace(/,/g, ", ")}
      </span>
    </div>
  );
}