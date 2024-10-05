package com.ega.imdb.services;

import com.ega.imdb.dtos.SearchCriteria;
import com.ega.imdb.entities.Movie;
import com.ega.imdb.repositories.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepository movieRepository;

    public Page<Movie> getPaginatedMoviesByCriteria(SearchCriteria sc) {
        var pagination = toPageable(sc.getPageNumber(), sc.getPageSize(),
                sc.getSortingField(), sc.isAscendingSorting());

        return movieRepository.findMovieBySearchCriteria(
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

    private Pageable toPageable(int pageNumber, int pageSize, String sortingField, boolean ascendingSorting) {
        if (Objects.nonNull(sortingField)) {
            var field = switch (sortingField) {
                case "year" -> "START_YEAR";
                case "runtimeMinutes" -> "RUNTIME";
                default -> sortingField;
            };
            var sorting = ascendingSorting ? Order.asc(field) : Order.desc(field);
            return PageRequest.of(pageNumber, pageSize, Sort.by(sorting));
        } else {
            return PageRequest.of(pageNumber, pageSize);
        }
    }
}
