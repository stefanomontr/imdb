import PaginatedDTO from "./PaginatedDTO.ts";

export default interface SearchCriteria extends PaginatedDTO {
    title?: string;
    maxRuntime?: number;
    minRuntime?: number;
    genre?: string;
    year?: number;
    maxRating?: number;
    minRating?: number;
}