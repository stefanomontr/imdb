package com.ega.imdb.services;

import com.ega.imdb.entities.Movie;
import com.ega.imdb.repositories.MovieRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepository movieRepository;

    @Transactional
    public Movie saveMovie(Movie movie) {
        return movieRepository.save(movie);
    }

}
