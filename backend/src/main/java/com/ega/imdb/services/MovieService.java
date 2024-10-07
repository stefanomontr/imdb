package com.ega.imdb.services;

import com.ega.imdb.dtos.SearchCriteria;
import com.ega.imdb.entities.Movie;
import com.ega.imdb.repositories.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepository movieRepository;

    public Page<Movie> getPaginatedMoviesByCriteria(SearchCriteria sc) {
        var pagination = PageRequest.of(sc.getPageNumber(), sc.getPageSize());
        if (Objects.nonNull(sc.getSortingField())) {
            return switch (sc.getSortingField()) {
                case "title" -> movieRepository.searchMoviesSortByTitle(
                        sc.getTitle(),
                        sc.getMaxRuntime(),
                        sc.getMinRuntime(),
                        sc.getGenre(),
                        sc.getYear(),
                        sc.getMaxRating(),
                        sc.getMinRating(),
                        sc.isAscendingSorting(),
                        pagination
                );
                case "year" -> movieRepository.searchMoviesSortByYear(
                        sc.getTitle(),
                        sc.getMaxRuntime(),
                        sc.getMinRuntime(),
                        sc.getGenre(),
                        sc.getYear(),
                        sc.getMaxRating(),
                        sc.getMinRating(),
                        sc.isAscendingSorting(),
                        pagination
                );
                case "runtime" -> movieRepository.searchMoviesSortByRuntime(
                        sc.getTitle(),
                        sc.getMaxRuntime(),
                        sc.getMinRuntime(),
                        sc.getGenre(),
                        sc.getYear(),
                        sc.getMaxRating(),
                        sc.getMinRating(),
                        sc.isAscendingSorting(),
                        pagination
                );
                case "rating" -> movieRepository.searchMoviesSortByRating(
                        sc.getTitle(),
                        sc.getMaxRuntime(),
                        sc.getMinRuntime(),
                        sc.getGenre(),
                        sc.getYear(),
                        sc.getMaxRating(),
                        sc.getMinRating(),
                        sc.isAscendingSorting(),
                        pagination
                );
                default -> throw new IllegalStateException("Unexpected value: " + sc.getSortingField());
            };
        }
        return  movieRepository.searchMovies(
                sc.getTitle(),
                sc.getMaxRuntime(),
                sc.getMinRuntime(),
                sc.getGenre(),
                sc.getYear(),
                sc.getMaxRating(),
                sc.getMinRating(),
                pagination
        );
    }
}
