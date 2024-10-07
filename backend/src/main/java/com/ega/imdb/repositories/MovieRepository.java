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

    String ORDER_BY_TITLE = """
    ORDER BY
        (m.TITLE IS NULL),
        CASE WHEN :ascendingSorting THEN m.TITLE END ASC,
        CASE WHEN NOT :ascendingSorting THEN m.TITLE END DESC,
        m.ID
    """;
    String ORDER_BY_RUNTIME = """
    ORDER BY
        (m.RUNTIME IS NULL),
        CASE WHEN :ascendingSorting THEN m.RUNTIME END ASC,
        CASE WHEN NOT :ascendingSorting THEN m.RUNTIME END DESC,
        m.ID
    """;
    String ORDER_BY_YEAR = """
    ORDER BY
        (m.START_YEAR IS NULL),
        CASE WHEN :ascendingSorting THEN m.START_YEAR END ASC,
        CASE WHEN NOT :ascendingSorting THEN m.START_YEAR END DESC,
        m.ID
    """;
    String ORDER_BY_RATING = """
    ORDER BY
        (m.RATING IS NULL),
        CASE WHEN :ascendingSorting THEN m.RATING END ASC,
        CASE WHEN NOT :ascendingSorting THEN m.RATING END DESC,
        m.ID
    """;

    String SEARCH = """
    SELECT * FROM movies m WHERE
        (:title IS NULL OR MATCH(m.TITLE) AGAINST(:title IN NATURAL LANGUAGE MODE)) AND
        (
            (:maxRuntime IS NULL AND :minRuntime IS NULL) OR
            (:maxRuntime IS NULL AND m.RUNTIME >= :minRuntime) OR
            (:minRuntime IS NULL AND m.RUNTIME <= :maxRuntime) OR
            (m.RUNTIME >= :minRuntime AND m.RUNTIME <= :maxRuntime)
        ) AND
        (:genre IS NULL OR MATCH(m.GENRES) AGAINST(:genre IN BOOLEAN MODE)) AND
        (:year IS NULL OR m.START_YEAR = :year) AND
        (
            (:maxRating IS NULL AND :minRating IS NULL) OR
            (:maxRating IS NULL AND m.RATING >= :minRating) OR
            (:minRating IS NULL AND m.RATING <= :maxRating) OR
            (m.RATING >= :minRating AND m.RATING <= :maxRating)
        )
    """;

    @Query(value = SEARCH, nativeQuery = true)
    Page<Movie> searchMovies(
            @Param("title") String title,
            @Param("maxRuntime") Integer maxRuntime,
            @Param("minRuntime") Integer minRuntime,
            @Param("genre") String genre,
            @Param("year") Integer year,
            @Param("maxRating") Integer maxRating,
            @Param("minRating") Integer minRating,
            Pageable pageable
    );

    @Query(value = SEARCH + ORDER_BY_TITLE, nativeQuery = true)
    Page<Movie> searchMoviesSortByTitle(
            @Param("title") String title,
            @Param("maxRuntime") Integer maxRuntime,
            @Param("minRuntime") Integer minRuntime,
            @Param("genre") String genre,
            @Param("year") Integer year,
            @Param("maxRating") Integer maxRating,
            @Param("minRating") Integer minRating,
            @Param("ascendingSorting") Boolean ascendingSorting,
            Pageable pageable
    );

    @Query(value = SEARCH + ORDER_BY_RUNTIME, nativeQuery = true)
    Page<Movie> searchMoviesSortByRuntime(
            @Param("title") String title,
            @Param("maxRuntime") Integer maxRuntime,
            @Param("minRuntime") Integer minRuntime,
            @Param("genre") String genre,
            @Param("year") Integer year,
            @Param("maxRating") Integer maxRating,
            @Param("minRating") Integer minRating,
            @Param("ascendingSorting") Boolean ascendingSorting,
            Pageable pageable
    );

    @Query(value = SEARCH + ORDER_BY_YEAR, nativeQuery = true)
    Page<Movie> searchMoviesSortByYear(
            @Param("title") String title,
            @Param("maxRuntime") Integer maxRuntime,
            @Param("minRuntime") Integer minRuntime,
            @Param("genre") String genre,
            @Param("year") Integer year,
            @Param("maxRating") Integer maxRating,
            @Param("minRating") Integer minRating,
            @Param("ascendingSorting") Boolean ascendingSorting,
            Pageable pageable
    );

    @Query(value = SEARCH + ORDER_BY_RATING, nativeQuery = true)
    Page<Movie> searchMoviesSortByRating(
            @Param("title") String title,
            @Param("maxRuntime") Integer maxRuntime,
            @Param("minRuntime") Integer minRuntime,
            @Param("genre") String genre,
            @Param("year") Integer year,
            @Param("maxRating") Integer maxRating,
            @Param("minRating") Integer minRating,
            @Param("ascendingSorting") Boolean ascendingSorting,
            Pageable pageable
    );
}
