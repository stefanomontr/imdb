import classes from "../css/MovieSearch.module.css";
import SearchFilters from "./SearchFilters.tsx";
import FilterChips from "./FilterChips.tsx";
import SearchResults from "./SearchResults.tsx";

export default function AdvancedSearch() {
  return (
    <section className={classes.search}>
      <h1 className={classes.search__title}>Advanced Title Search</h1>
      <FilterChips/>
      <div className={classes.search__container}>
        <SearchFilters/>
        <SearchResults/>
      </div>
    </section>
  );
}