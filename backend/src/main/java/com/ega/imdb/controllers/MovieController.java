package com.ega.imdb.controllers;

import com.ega.imdb.dtos.PopulateDBStats;
import com.ega.imdb.entities.Movie;
import com.ega.imdb.services.MovieService;
import com.opencsv.CSVParserBuilder;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.enums.CSVReaderNullFieldIndicator;
import com.opencsv.exceptions.CsvValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileReader;
import java.io.IOException;
import java.util.Objects;

@RestController
@RequestMapping("movies")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;

    @PostMapping(value = "/populate-db", produces = MediaType.APPLICATION_JSON_VALUE)
    PopulateDBStats populateDB(@RequestParam String titlesDataSource
//            , @RequestParam String ratingsDataSource
    ) {
        try (CSVReader reader = new CSVReaderBuilder(new FileReader(titlesDataSource))
                .withSkipLines(1)
                .withCSVParser(new CSVParserBuilder()
                    .withSeparator('\t')
                        .withFieldAsNull(CSVReaderNullFieldIndicator.EMPTY_SEPARATORS)
                    .build())
                .build()) {

            String[] line;
            while ((line = reader.readNext()) != null) {
                var movie = Movie.builder()
                        .id(line[0])
                        .title(line[2])
                        .year(Objects.nonNull(line[5]) ? Integer.valueOf(line[5]) : null)
                        .runtimeMinutes(Objects.nonNull(line[5]) ? Integer.valueOf(line[7]) : null)
                        .genres(line[8])
                        .build();

                movieService.saveMovie(movie);
            }

            System.out.println("OK");

        } catch (IOException | CsvValidationException e) {
            return PopulateDBStats.builder()
                    .status(-1)
                    .build();
        }

        return PopulateDBStats.builder()
                .status(0)
                .build();
    }
}
