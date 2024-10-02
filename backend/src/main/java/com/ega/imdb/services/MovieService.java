package com.ega.imdb.services;

import com.ega.imdb.dtos.PaginationFilter;
import com.ega.imdb.dtos.SearchCriteria;
import com.ega.imdb.entities.Movie;
import com.ega.imdb.repositories.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Service;

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
        if (CollectionUtils.isNotEmpty(paginationFilter.getSortingCriteria())) {
            var sorts = paginationFilter.getSortingCriteria().stream()
                    .map(sorting -> sorting.isAscending()
                            ? Order.asc(sorting.getField())
                            : Order.desc(sorting.getField()))
                    .toList();
            pagination = PageRequest.of(paginationFilter.getOffset(), paginationFilter.getLimit(), Sort.by(sorts));
        } else {
            pagination = PageRequest.of(paginationFilter.getOffset(), paginationFilter.getLimit());
        }
        return pagination;
    }
}
