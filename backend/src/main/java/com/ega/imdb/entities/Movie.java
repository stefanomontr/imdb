package com.ega.imdb.entities;

import com.opencsv.bean.CsvBindByName;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "MOVIES")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Movie {

    @Id
    @Column(name = "ID")
    @CsvBindByName(column = "tconst")
    String id;

    @Column(name = "TITLE")
    @CsvBindByName(column = "primaryTitle")
    String title;

    @Column(name = "GENRES")
    @CsvBindByName(column = "genres")
    String genres;

    @Column(name = "YEAR")
    @CsvBindByName(column = "startYear")
    Integer year;

    @Column(name = "RATING")
    Double rating;

    @Column(name = "RUNTIME")
    @CsvBindByName(column = "runtimeMinutes")
    Integer runtimeMinutes;

    @Column(name = "AVG_RATING")
    @CsvBindByName(column = "averageRating")
    Double avgRating;

    @Column(name = "NUM_VOTES")
    @CsvBindByName(column = "numVotes")
    Integer numVotes;

}
