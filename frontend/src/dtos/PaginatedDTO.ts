export default interface PaginatedDTO {
    pageNumber: number;
    pageSize: number;
    sortingField?: string;
    ascendingSorting?: boolean;
}