import classes from "./Movies.module.css";
import border from "../utils/css-utils.ts";
import SortingDirection from "./SortingDirection.tsx";
import {useContext} from "react";
import SearchContext from "./SearchContext.tsx";

const NO_SORTING = "No sorting";

export default function SearchSorting() {
  const { searchCriteria, setSorting } = useContext(SearchContext);

  // @ts-expect-error `e` is generic browser event
  const onSortHandler = e => {
    const newValue = e.target.value;
    if (newValue === NO_SORTING && searchCriteria.paginationFilter.sorting !== newValue) {
      setSorting(undefined);
    } else if (searchCriteria.paginationFilter.sorting !== newValue) {
      setSorting({
        field: newValue,
        ascending: true
      });
    }
  };

  return (
    <div className={classes.advancedSearch__sorting + border()}>
      <span>Sort by </span>
      <select
        key={searchCriteria.paginationFilter.sorting?.field}
        defaultValue={searchCriteria.paginationFilter.sorting?.field}
        onChange={onSortHandler}
      >
        <option value={NO_SORTING}>{NO_SORTING}</option>
        <option value={"title"}>Title</option>
        <option value={"runtimeMinutes"}>Runtime</option>
        <option value={"year"}>Year</option>
        <option value={"rating"}>Rating</option>
      </select>
      <SortingDirection />
    </div>
  );
}