import classes from "./Movies.module.css";
import border from "../utils/css-utils.ts";
import SearchFilters from "./SearchFilters.tsx";
import FilterChips from "./FilterChips.tsx";
import SearchResults from "./SearchResults.tsx";

export default function AdvancedSearch() {
  return (
    <section>
      <div className={classes.advancedSearch + border()}>
        <h1 className={classes.advancedSearch__title}>Advanced Title Search</h1>
        <FilterChips/>
        <SearchFilters/>
        <SearchResults />
      </div>
    </section>
  );
}