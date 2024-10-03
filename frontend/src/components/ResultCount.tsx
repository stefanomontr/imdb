import classes from "./Movies.module.css";
import border from "../utils/css-utils.ts";

export default function ResultCount() {
  return (
    <div className={classes.advancedSearch__resultCount + border()}>
      Tot. results
    </div>
  );
}