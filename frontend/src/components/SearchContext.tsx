import {createContext, PropsWithChildren, useReducer} from "react";
import SearchCriteria from "../dtos/SearchCriteria.ts";
import {SEARCH_ACTION, SearchAction} from "../utils/search-utils.ts";
import PaginationFilter from "../dtos/PaginationFilter.ts";
import SortCriterion from "../dtos/SortCriterion.ts";

type SearchContextType = {
  searchCriteria: SearchCriteria,
  setTitle: (title: string | undefined) => void,
  setMaxRuntime: (maxRuntime: number | undefined) => void,
  setMinRuntime: (minRuntime: number | undefined) => void,
  setGenre: (genre: string | undefined) => void,
  setYear: (year: number | undefined) => void,
  setMaxRating: (maxRating: number | undefined) => void,
  setMinRating: (minRating: number | undefined) => void,
  setPagination: (paginationFilter: PaginationFilter) => void,
  setSorting: (sorting: SortCriterion | undefined) => void
}

const SearchContext = createContext({} as SearchContextType);

export const PAGE_SIZE = 10;

export function SearchContextProvider(props: PropsWithChildren<object>) {

  const initPagination = {
    pageNumber: 0,
    limit: PAGE_SIZE
  } as PaginationFilter;

  const [searchCriteria, dispatchSearchCriteria] = useReducer(
    (state: SearchCriteria, action: SearchAction): SearchCriteria => {
      switch (action.type) {
        case SEARCH_ACTION.TITLE:
          return {
            ...state, title:
            action.payload.value,
            paginationFilter: initPagination
          };
        case SEARCH_ACTION.MAX_RUNTIME:
          return {
            ...state,
            maxRuntime: action.payload.value,
            paginationFilter: initPagination
          };
        case SEARCH_ACTION.MIN_RUNTIME:
          return {
            ...state,
            minRuntime: action.payload.value,
            paginationFilter: initPagination
          };
        case SEARCH_ACTION.GENRE:
          return {
            ...state,
            genre: action.payload.value,
            paginationFilter: initPagination
          };
        case SEARCH_ACTION.YEAR:
          return {
            ...state,
            year: action.payload.value,
            paginationFilter: initPagination
          };
        case SEARCH_ACTION.MAX_RATING:
          return {
            ...state,
            maxRating: action.payload.value,
            paginationFilter: initPagination
          };
        case SEARCH_ACTION.MIN_RATING:
          return {
            ...state,
            minRating: action.payload.value,
            paginationFilter: initPagination
          };
        case SEARCH_ACTION.PAGINATION:
          return {...state, paginationFilter: action.payload.value};
        case SEARCH_ACTION.SORTING:
          return {
            ...state,
            paginationFilter: {
              ...initPagination,
              sorting: action.payload.value
            }
          };
        default:
          return state;
      }
    }, { paginationFilter: initPagination } as SearchCriteria
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
    searchAction(SEARCH_ACTION.TITLE, title);
  const setMaxRuntime = (maxRuntime: number | undefined) =>
    searchAction(SEARCH_ACTION.MAX_RUNTIME, maxRuntime);
  const setMinRuntime = (minRuntime: number | undefined) =>
    searchAction(SEARCH_ACTION.MIN_RUNTIME, minRuntime);
  const setGenre = (genre: string | undefined) =>
    searchAction(SEARCH_ACTION.GENRE, genre);
  const setYear = (year: number | undefined) =>
    searchAction(SEARCH_ACTION.YEAR, year);
  const setMaxRating = (maxRating: number | undefined) =>
    searchAction(SEARCH_ACTION.MAX_RATING, maxRating);
  const setMinRating = (minRating: number | undefined) =>
    searchAction(SEARCH_ACTION.MIN_RATING, minRating);
  const setSorting = (sorting: SortCriterion | undefined) =>
    searchAction(SEARCH_ACTION.SORTING, sorting);
  const setPagination = (paginationFilter: PaginationFilter) =>
    searchAction(SEARCH_ACTION.PAGINATION, paginationFilter);

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
      setPagination,
      setSorting
    }}>
      {props.children}
    </SearchContext.Provider>
  );
}

export default SearchContext;