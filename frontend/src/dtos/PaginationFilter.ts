import SortCriterion from "./SortCriterion.ts";

export default interface PaginationFilter {
    pageNumber: number;
    limit: number;
    sorting: SortCriterion;
}