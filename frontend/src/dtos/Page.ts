export default interface Page<T> {
    content: T[],
    pageable: {
        pageNumber: number;
        pageSize: number;
        offset: 0;
    },
    totalPages: number;
    totalElements: number;
    numberOfElements: number;
    first: boolean;
    last: boolean;
}