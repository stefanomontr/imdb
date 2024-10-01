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
    @Column(name = "ID")
    String id;

    @Column(name = "TITLE", length = 400)
    String title;

    @Column(name = "GENRES")
    String genres;

    @Column(name = "START_YEAR")
    Integer year;

    @Column(name = "RUNTIME")
    Integer runtimeMinutes;

    @Column(name = "RATING")
    Double rating;

    @Column(name = "NUM_VOTES")
    Integer numVotes;

}
