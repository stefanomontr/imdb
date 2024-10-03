package com.ega.imdb.dtos;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class PaginationFilter {

    private final int offset;
    private final int limit;
    private final SortingCriterion sorting;

}
