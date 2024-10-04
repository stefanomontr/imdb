import Page from "./Page.ts";
import Movie from "./Movie.ts";

export type PageInfo = Omit<Page<Movie>, "content">;