package com.ega.imdb.dtos;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class SortingCriterion {
    private final String field;
    private final boolean ascending;
}
