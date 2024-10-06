import classes from "../css/MovieSearch.module.css";
import {useContext} from "react";
import SearchContext from "./SearchContext.tsx";

export default function SortingDirection() {
  const {searchCriteria, setSorting} = useContext(SearchContext);

  // @ts-expect-error `e` is generic browser event
  const onChangeDirectionHandler = e => {
    if (searchCriteria.sortingField) {
      setSorting({
        sortingField: searchCriteria.sortingField,
        ascendingSorting: !searchCriteria.ascendingSorting
      });
    }
  }

  return (
    <div onClick={onChangeDirectionHandler} data-testId={"search-sorting-direction"}>
      <svg
        className={
          searchCriteria.sortingField
            ? classes.search__sortingDirIcon
            : classes.search__sortingDirIcon_disabled
        }
        width="24" height="24" xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24" fill="currentColor" role="presentation">
        <path fill="none" d="M0 0h24v24H0V0z"/>
        <path
          d={
            `M16 17.01V11c0-.55-.45-1-1-1s-1 .45-1 1v6.01h-1.79c-.45 
              0-.67.54-.35.85l2.79 2.78c.2.19.51.19.71 
              0l2.79-2.78c.32-.31.09-.85-.35-.85H16zM8.65 3.35L5.86`
          }
        />
        <path
          d={
            `M16 0l2.79-2.78c.32-.31.09-.85-.35-.85H16zM8.65 3.35L5.86 
              6.14c-.32.31-.1.85.35.85H8V13c0 .55.45 1 1 1s1-.45 1-1V6.99h1.79c.45 
              0 .67-.54.35-.85L9.35 3.35a.501.501 0 0 0-.7 0z`
          }
        />
      </svg>
    </div>
  );
}