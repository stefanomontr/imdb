export default interface Movie {
    id: string;
    title: string;
    runtimeMinutes?: number;
    genres?: string;
    year?: number;
    rating?: number;
    numVotes?: number;
}