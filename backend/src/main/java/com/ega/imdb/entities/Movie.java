package com.ega.imdb.entities;

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
    @Column(name = "ID", length = 12)
    String id;

    @Column(name = "TITLE")
    String title;

    @Column(name = "GENRES")
    String genres;

    // TODO align column names with attr names
    @Column(name = "START_YEAR")
    Integer year;

    @Column(name = "RUNTIME")
    Integer runtime;

    @Column(name = "RATING")
    Double rating;

    @Column(name = "NUM_VOTES")
    Integer numVotes;

}
