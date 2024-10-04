import Page from "../dtos/Page.ts";
import Movie from "../dtos/Movie.ts";
import SearchCriteria from "../dtos/SearchCriteria.ts";

const backendApi = import.meta.env.BACKEND_API;

function returnResponseOrThrowErrorIfAny<T>(response: T) {
    // @ts-expect-error generic T type has no defined attributes
    if (response.error || response.message || response.ok === false) {
        throw new Error(
          // @ts-expect-error generic T has no defined attributes
          `ErrorCode: ${response.status || "NaN"}; details: ${JSON.stringify(response)}`
        );
    }
    return response;
}

export async function fetchFromBackendApi<T>(url: string, options: RequestInit): Promise<T> {
    console.log("backend API: ", backendApi);
    return fetch(`http://localhost:8080/${url}`, options)
        .then(resp => resp.json())
        .then(resp => returnResponseOrThrowErrorIfAny<T>(resp));
}

export type PaginatedSearchRequest = {
    pageParam: number;
    searchCriteria: SearchCriteria;
    signal: AbortSignal;
}

export const paginatedSearch = async (request: PaginatedSearchRequest) => {
    const requestBody = {
        ...request.searchCriteria,
        pageNumber: request.pageParam,
        pageSize: 5
    } as SearchCriteria;

    return fetchFromBackendApi<Page<Movie>>("movies/search", {
        signal: request.signal,
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json"
        })
    })
};