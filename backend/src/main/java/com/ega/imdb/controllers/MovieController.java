package com.ega.imdb.controllers;

import com.ega.imdb.dtos.SearchCriteria;
import com.ega.imdb.entities.Movie;
import com.ega.imdb.services.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("movies")
@RequiredArgsConstructor
@CrossOrigin(origins = "${allowed.cross.origin}")
public class MovieController {

    private final MovieService movieService;

    @PostMapping("search")
    Page<Movie> getPaginatedMoviesBySearchCriteria(@RequestBody SearchCriteria searchCriteria) {
        return movieService.getPaginatedMoviesByCriteria(searchCriteria);
    }

}
