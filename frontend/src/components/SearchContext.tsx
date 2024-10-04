import {createContext, PropsWithChildren, useReducer} from "react";
import SearchCriteria from "../dtos/SearchCriteria.ts";
import SortCriterion from "../dtos/SortCriterion.ts";
import SearchAction, {SEARCH_ACTION_TYPE} from "../dtos/SearchAction.ts";

type SearchContextType = {
  searchCriteria: SearchCriteria,
  setTitle: (title: string | undefined) => void,
  setMaxRuntime: (maxRuntime: number | undefined) => void,
  setMinRuntime: (minRuntime: number | undefined) => void,
  setGenre: (genre: string | undefined) => void,
  setYear: (year: number | undefined) => void,
  setMaxRating: (maxRating: number | undefined) => void,
  setMinRating: (minRating: number | undefined) => void,
  setSorting: (sorting: SortCriterion | undefined) => void
}

const SearchContext = createContext({} as SearchContextType);

export const PAGE_SIZE = 10;

export function SearchContextProvider(props: PropsWithChildren<object>) {

  const [searchCriteria, dispatchSearchCriteria] = useReducer(
    (state: SearchCriteria, action: SearchAction): SearchCriteria => {
      switch (action.type) {
        case SEARCH_ACTION_TYPE.TITLE:
          return {
            ...state, title:
            action.payload.value
          };
        case SEARCH_ACTION_TYPE.MAX_RUNTIME:
          return {
            ...state,
            maxRuntime: action.payload.value
          };
        case SEARCH_ACTION_TYPE.MIN_RUNTIME:
          return {
            ...state,
            minRuntime: action.payload.value
          };
        case SEARCH_ACTION_TYPE.GENRE:
          return {
            ...state,
            genre: action.payload.value
          };
        case SEARCH_ACTION_TYPE.YEAR:
          return {
            ...state,
            year: action.payload.value
          };
        case SEARCH_ACTION_TYPE.MAX_RATING:
          return {
            ...state,
            maxRating: action.payload.value
          };
        case SEARCH_ACTION_TYPE.MIN_RATING:
          return {
            ...state,
            minRating: action.payload.value
          };
        case SEARCH_ACTION_TYPE.SORTING:
          return {
            ...state,
            sortingField: action.payload.value?.sortingField,
            ascendingSorting: action.payload.value?.ascendingSorting
          };
        default:
          return state;
      }
    }, {} as SearchCriteria
  );

  const searchAction = (actionType: string, value: any) => {
    dispatchSearchCriteria({
      "type": actionType,
      payload: {
        value
      }
    });
  }

  const setTitle = (title: string | undefined) =>
    searchAction(SEARCH_ACTION_TYPE.TITLE, title);
  const setMaxRuntime = (maxRuntime: number | undefined) =>
    searchAction(SEARCH_ACTION_TYPE.MAX_RUNTIME, maxRuntime);
  const setMinRuntime = (minRuntime: number | undefined) =>
    searchAction(SEARCH_ACTION_TYPE.MIN_RUNTIME, minRuntime);
  const setGenre = (genre: string | undefined) =>
    searchAction(SEARCH_ACTION_TYPE.GENRE, genre);
  const setYear = (year: number | undefined) =>
    searchAction(SEARCH_ACTION_TYPE.YEAR, year);
  const setMaxRating = (maxRating: number | undefined) =>
    searchAction(SEARCH_ACTION_TYPE.MAX_RATING, maxRating);
  const setMinRating = (minRating: number | undefined) =>
    searchAction(SEARCH_ACTION_TYPE.MIN_RATING, minRating);
  const setSorting = (sorting: SortCriterion | undefined) =>
    searchAction(SEARCH_ACTION_TYPE.SORTING, sorting);


  return (
    <SearchContext.Provider value={{
      searchCriteria,
      setTitle,
      setMaxRuntime,
      setMinRuntime,
      setGenre,
      setYear,
      setMaxRating,
      setMinRating,
      setSorting
    }}>
      {props.children}
    </SearchContext.Provider>
  );
}

export default SearchContext;