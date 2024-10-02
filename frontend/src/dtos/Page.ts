export default interface Page<T> {
    content: T[],
    pageable: {
        pageNumber: number;
        pageSize: number;
        offset: 0;
    },
    totalPages: number;
    totalElements: number;
    first: boolean;
    last: boolean;
}