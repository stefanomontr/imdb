import ReviewStar from "./ReviewStar.tsx";
import classes from "../css/MovieSearch.module.css";
import {formatNumVotes} from "../utils/math-utils.ts";

export interface MovieReviewsProps {
  rating?: number;
  numVotes?: number;
}

export default function MovieReviews(props: MovieReviewsProps) {
  return (
    <div>
      <ReviewStar/>
      <span className={classes.search__movieRating}>
        {props.rating || "--"}
      </span>
      <span className={classes.search__movieReviewNum}>
        {props.numVotes && `(${formatNumVotes(props.numVotes)})`}
      </span>
    </div>
  )
}