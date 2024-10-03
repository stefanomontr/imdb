package com.ega.imdb.repositories;

import com.ega.imdb.entities.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends PagingAndSortingRepository<Movie, String> {

    @Query("""
    SELECT m FROM Movie m WHERE
        (:title IS NULL OR m.title LIKE %:title%) AND
        (
            (:maxRuntime IS NULL AND :minRuntime IS NULL) OR
            (:maxRuntime IS NULL AND m.runtimeMinutes >= :minRuntime) OR
            (:minRuntime IS NULL AND m.runtimeMinutes <= :maxRuntime) OR
            (m.runtimeMinutes >= :minRuntime AND m.runtimeMinutes <= :maxRuntime)
        ) AND
        (:genre IS NULL OR m.genres LIKE %:genre%) AND
        (:year IS NULL OR m.year = :year) AND
        (
            (:maxRating IS NULL AND :minRating IS NULL) OR
            (:maxRating IS NULL AND m.rating >= :minRating) OR
            (:minRating IS NULL AND m.rating <= :maxRating) OR
            (m.rating >= :minRating AND m.rating <= :maxRating)
        )
    """)
    Page<Movie> findMovieBySearchCriteria(
            @Param("title") String title,
            @Param("maxRuntime") Integer maxRuntime,
            @Param("minRuntime") Integer minRuntime,
            @Param("genre") String genre,
            @Param("year") Integer year,
            @Param("maxRating") Integer maxRating,
            @Param("minRating") Integer minRating,
            Pageable pageable
    );

}
