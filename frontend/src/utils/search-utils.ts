export const SEARCH_ACTION = {
  TITLE: "SEARCH_TITLE",
  MAX_RUNTIME: "SEARCH_MAX_RUNTIME",
  MIN_RUNTIME: "SEARCH_MIN_RUNTIME",
  GENRE: "SEARCH_GENRE",
  YEAR: "SEARCH_YEAR",
  MIN_RATING: "SEARCH_MIN_RATING",
  MAX_RATING: "SEARCH_MAX_RATING"
};

export type SearchAction = {
  type: string;
  payload: {
    value: any
  }
};

