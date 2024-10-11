import Movie from "../dtos/Movie.ts";
import classes from "../css/MovieSearch.module.css";
import MoviePoster from "./MoviePoster.tsx";
import MovieTitle from "./MovieTitle.tsx";
import MovieReviews from "./MovieReviews.tsx";
import MovieInfo from "./MovieInfo.tsx";

export interface MovieProps {
  movie: Movie
}

export default function MovieItem(props: MovieProps) {
  const imdbUrl  = `https://www.imdb.com/title/${props.movie.id}/?ref_=sr_t_1`;

  return (
    <div className={classes.search__movie}>
      <div className={classes.search__moviePoster}>
        <MoviePoster imdbUrl={imdbUrl} movieTitle={props.movie.title}/>
      </div>
      <div className={classes.search__movieSpecs}>
        <MovieTitle
          imdbUrl={imdbUrl}
          movieTitle={props.movie.title}
        />
        <MovieInfo
          year={props.movie.year}
          runtime={props.movie.runtime}
          genres={props.movie.genres}
        />
        <MovieReviews
          rating={props.movie.rating}
          numVotes={props.movie.numVotes}
        />
      </div>
    </div>
  );
}