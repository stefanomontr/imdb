package com.ega.imdb.repositories;

import com.ega.imdb.entities.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public abstract class MovieRepository implements JpaRepository<Movie, String> {
    
}
