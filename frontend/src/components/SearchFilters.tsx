import SearchFilter from "./SearchFilter.tsx";
import {useContext} from "react";
import NumberField from "./NumberField.tsx";
import TextField from "./TextField.tsx";
import SearchContext from "./SearchContext.tsx";
import classes from "../css/MovieSearch.module.css";

export default function SearchFilters() {
  const searchCtx = useContext(SearchContext);

  return (
    <div className={classes.search__filters}>
      <SearchFilter fieldTitle={"Title"}>
        <TextField
          key={searchCtx.searchCriteria.title}
          value={searchCtx.searchCriteria.title}
          placeholder={"e.g. The GodFather"}
          setField={searchCtx.setTitle}
        />
      </SearchFilter>
      <SearchFilter fieldTitle={"Runtime"}>
        <span>From</span>
        <NumberField
          key={searchCtx.searchCriteria.minRuntime}
          value={searchCtx.searchCriteria.minRuntime}
          min={0}
          max={searchCtx.searchCriteria.maxRuntime || 1000}
          placeholder={"Set min runtime minutes"}
          setField={searchCtx.setMinRuntime}
        />
        <span>To</span>
        <NumberField
          key={searchCtx.searchCriteria.maxRuntime}
          value={searchCtx.searchCriteria.maxRuntime}
          min={searchCtx.searchCriteria.minRuntime || 0}
          max={1000}
          placeholder={"Set max runtime minutes"}
          setField={searchCtx.setMaxRuntime}
        />
      </SearchFilter>
      <SearchFilter fieldTitle={"Genre"}>
        <TextField
          key={searchCtx.searchCriteria.genre}
          value={searchCtx.searchCriteria.genre}
          placeholder={"e.g. Drama"}
          setField={searchCtx.setGenre}
        />
      </SearchFilter>
      <SearchFilter fieldTitle={"Year"}>
        <NumberField
          key={searchCtx.searchCriteria.year}
          value={searchCtx.searchCriteria.year}
          min={1800}
          max={2500}
          placeholder={"YYYY"}
          setField={searchCtx.setYear}
        />
      </SearchFilter>
      <SearchFilter fieldTitle={"Average Rating"}>
        <span>From</span>
        <NumberField
          key={searchCtx.searchCriteria.minRating}
          value={searchCtx.searchCriteria.minRating}
          min={0}
          max={searchCtx.searchCriteria.maxRating || 10}
          placeholder={"Set min average rating"}
          setField={searchCtx.setMinRating}
        />
        <span>To</span>
        <NumberField
          key={searchCtx.searchCriteria.maxRating}
          value={searchCtx.searchCriteria.maxRating}
          min={searchCtx.searchCriteria.minRating || 0}
          max={10}
          placeholder={"Set max average rating"}
          setField={searchCtx.setMaxRating}
        />
      </SearchFilter>
    </div>
  );
}