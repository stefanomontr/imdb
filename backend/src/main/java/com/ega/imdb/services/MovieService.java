package com.ega.imdb.services;

import com.ega.imdb.dtos.PaginationFilter;
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

    public Page<Movie> getPaginatedMovies(PaginationFilter paginationFilter) {
        var pagination = toPageable(paginationFilter);
        return movieRepository.findAll(pagination);
    }

    public Page<Movie> getPaginatedMoviesByCriteria(SearchCriteria sc) {
        var pagination = toPageable(sc.getPaginationFilter());
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

    private Pageable toPageable(PaginationFilter paginationFilter) {
        Pageable pagination;
        if (Objects.nonNull(paginationFilter.getSorting())
                && Objects.nonNull(paginationFilter.getSorting().getField())) {
            var field = switch (paginationFilter.getSorting().getField()) {
                case "year" -> "START_YEAR";
                case "runtimeMinutes" -> "RUNTIME";
                default -> paginationFilter.getSorting().getField();
            };
            var sorting = paginationFilter.getSorting().isAscending()
                            ? Order.asc(field)
                            : Order.desc(field);
            pagination = PageRequest.of(paginationFilter.getPageNumber(), paginationFilter.getLimit(), Sort.by(sorting));
        } else {
            pagination = PageRequest.of(paginationFilter.getPageNumber(), paginationFilter.getLimit());
        }
        return pagination;
    }
}
