import SortCriterion from "./SortCriterion.ts";

export default interface PaginationFilter {
    offset: number;
    limit: number;
    sortingCriteria: SortCriterion[];
}