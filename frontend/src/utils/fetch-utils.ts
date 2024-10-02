const backendApi = import.meta.env.BACKEND_API;

export default async function fetchFromBackendApi<T>(url: string, options: RequestInit): Promise<T> {
    console.log("backend API: ", backendApi);
    return fetch(`http://localhost:8080/${url}`, options)
        .then(resp => resp.json())
        .then(resp => returnResponseOrThrowErrorIfAny<T>(resp));
}

function returnResponseOrThrowErrorIfAny<T>(response: T) {
    // @ts-expect-error generic T type does not have defined attributes
    if (response.error || response.message || response.ok === false) {
        throw new Error(
            // @ts-expect-error generic T type does not have defined attributes
            `ErrorCode: ${response.status || "NaN"}; details: ${JSON.stringify(response)}`
        );
    }
    return response;
}