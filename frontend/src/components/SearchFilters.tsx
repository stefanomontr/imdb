import SearchFilter from "./SearchFilter.tsx";
import {useContext} from "react";
import NumberField from "./NumberField.tsx";
import TextField from "./TextField.tsx";
import SearchContext from "./SearchContext.tsx";
import classes from "../css/MovieSearch.module.css";
import Constants from "../utils/constants.ts";

export default function SearchFilters() {
  const searchCtx = useContext(SearchContext);

  return (
    <div className={classes.search__filters}>
      <SearchFilter fieldTitle={Constants.TITLE}>
        <TextField
          key={searchCtx.searchCriteria.title}
          dataTestId={"search-filter-title"}
          value={searchCtx.searchCriteria.title}
          placeholder={"e.g. The GodFather"}
          setField={searchCtx.setTitle}
        />
      </SearchFilter>
      <SearchFilter fieldTitle={Constants.RUNTIME}>
        <span>From</span>
        <NumberField
          key={searchCtx.searchCriteria.minRuntime}
          dataTestId={"search-filter-min-runtime"}
          value={searchCtx.searchCriteria.minRuntime}
          min={0}
          max={searchCtx.searchCriteria.maxRuntime || 1000}
          placeholder={Constants.MIN_RUNTIME_PLACEHOLDER}
          setField={searchCtx.setMinRuntime}
        />
        <span>To</span>
        <NumberField
          key={searchCtx.searchCriteria.maxRuntime}
          dataTestId={"search-filter-max-runtime"}
          value={searchCtx.searchCriteria.maxRuntime}
          min={searchCtx.searchCriteria.minRuntime || 0}
          max={1000}
          placeholder={Constants.MAX_RUNTIME_PLACEHOLDER}
          setField={searchCtx.setMaxRuntime}
        />
      </SearchFilter>
      <SearchFilter fieldTitle={Constants.GENRE}>
        <TextField
          key={searchCtx.searchCriteria.genre}
          dataTestId={"search-filter-genre"}
          value={searchCtx.searchCriteria.genre}
          placeholder={Constants.GENRE_PLACEHOLDER}
          setField={searchCtx.setGenre}
        />
      </SearchFilter>
      <SearchFilter fieldTitle={Constants.YEAR}>
        <NumberField
          key={searchCtx.searchCriteria.year}
          dataTestId={"search-filter-year"}
          value={searchCtx.searchCriteria.year}
          min={1800}
          max={2500}
          placeholder={Constants.YEAR_PLACEHOLDER}
          setField={searchCtx.setYear}
        />
      </SearchFilter>
      <SearchFilter fieldTitle={Constants.RATING}>
        <span>From</span>
        <NumberField
          key={searchCtx.searchCriteria.minRating}
          dataTestId={"search-filter-min-rating"}
          value={searchCtx.searchCriteria.minRating}
          min={0}
          max={searchCtx.searchCriteria.maxRating || 10}
          placeholder={Constants.MIN_RATING_PLACEHOLDER}
          setField={searchCtx.setMinRating}
        />
        <span>To</span>
        <NumberField
          key={searchCtx.searchCriteria.maxRating}
          dataTestId={"search-filter-max-rating"}
          value={searchCtx.searchCriteria.maxRating}
          min={searchCtx.searchCriteria.minRating || 0}
          max={10}
          placeholder={Constants.MAX_RATING_PLACEHOLDER}
          setField={searchCtx.setMaxRating}
        />
      </SearchFilter>
    </div>
  );
}