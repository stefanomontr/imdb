import PaginationFilter from "./PaginationFilter.ts";

export default interface SearchCriteria {
    title?: string;
    maxRuntime?: number;
    minRuntime?: number;
    genre?: string;
    year?: number;
    maxRating?: number;
    minRating?: number;
    paginationFilter: PaginationFilter;
}