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

    @Query(value = """
    SELECT * FROM movies m WHERE
        (:title IS NULL OR MATCH(m.TITLE) AGAINST(:title IN NATURAL LANGUAGE MODE)) AND
        (
            (:maxRuntime IS NULL AND :minRuntime IS NULL) OR
            (:maxRuntime IS NULL AND m.RUNTIME >= :minRuntime) OR
            (:minRuntime IS NULL AND m.RUNTIME <= :maxRuntime) OR
            (m.RUNTIME >= :minRuntime AND m.RUNTIME <= :maxRuntime)
        ) AND
        (:genre IS NULL OR MATCH(m.GENRES) AGAINST(:genre IN NATURAL LANGUAGE MODE)) AND
        (:year IS NULL OR m.START_YEAR = :year) AND
        (
            (:maxRating IS NULL AND :minRating IS NULL) OR
            (:maxRating IS NULL AND m.RATING >= :minRating) OR
            (:minRating IS NULL AND m.RATING <= :maxRating) OR
            (m.RATING >= :minRating AND m.RATING <= :maxRating)
        )
    """, nativeQuery = true)
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
