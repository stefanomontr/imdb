package com.ega.imdb.dtos;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class SearchCriteria {

    private final String title;
    private final Integer maxRuntime;
    private final Integer minRuntime;
    private final Integer maxRating;
    private final Integer minRating;
    // TODO: search by multiple genres
    private final String genre;
    private final Integer year;
    private final PaginationFilter paginationFilter;

}
