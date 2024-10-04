package com.ega.imdb.dtos;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class PaginationFilter {

    private final int pageNumber;
    private final int limit;
    private final SortingCriterion sorting;

}
