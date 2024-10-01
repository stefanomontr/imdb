package com.ega.imdb.dtos;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class PopulateDBStats {
    private Integer numOfChangedRows;
    private Integer status;
}
