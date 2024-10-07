export default interface Movie {
    id: string;
    title: string;
    runtime?: number;
    genres?: string;
    year?: number;
    rating?: number;
    numVotes?: number;
}