import {Chip} from "@mui/material";
import {useContext} from "react";
import SearchContext from "./SearchContext.tsx";
import classes from "../css/MovieSearch.module.css";

export default function FilterChips() {

  const searchCtx = useContext(SearchContext);

  const searchFields = [
    {
      fieldLabel: "Title",
      value: searchCtx.searchCriteria.title,
      setField: searchCtx.setTitle
    },
    {
      fieldLabel: "Runtime under",
      value: searchCtx.searchCriteria.maxRuntime,
      setField: searchCtx.setMaxRuntime
    },
    {
      fieldLabel: "Runtime over",
      value: searchCtx.searchCriteria.minRuntime,
      setField: searchCtx.setMinRuntime
    },
    {
      fieldLabel: "Genre",
      value: searchCtx.searchCriteria.genre,
      setField: searchCtx.setGenre

    },
    {
      fieldLabel: "Rating over",
      value: searchCtx.searchCriteria.minRating,
      setField: searchCtx.setMinRating
    },
    {
      fieldLabel: "Rating under",
      value: searchCtx.searchCriteria.maxRating,
      setField: searchCtx.setMaxRating
    },
    {
      fieldLabel: "Release year",
      value: searchCtx.searchCriteria.year,
      setField: searchCtx.setYear
    }
  ].filter(({value}) => value);

  const renderSortingChip = () => {
    const sortingField = searchCtx.searchCriteria.sortingField;
    const ascendingSorting = searchCtx.searchCriteria.ascendingSorting;
    if (!sortingField) {
      return false;
    }
    return <Chip
      key={`${sortingField} ${ascendingSorting}`}
      label={`Sort by: ${sortingField} ${ascendingSorting ? "ASC" : "DESC"}`}
      onDelete={() => searchCtx.setSorting(undefined)}
    />;
  }

  return (
    <div className={classes.search__filterChips}>
      {searchFields.map(searchField => {
        const chipLabel = `${searchField.fieldLabel}: ${searchField.value}`;
        return (
          <div className={classes.search__filterChip}>
            <Chip
              key={chipLabel}
              label={chipLabel}
              onDelete={() => searchField.setField(undefined)}
            />
          </div>
        );
      })}
      {renderSortingChip()}
    </div>
  );
}