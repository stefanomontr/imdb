CREATE TABLE movies
(
    ID         VARCHAR(12),
    TITLE      VARCHAR(255),
    GENRES     VARCHAR(255),
    START_YEAR INT,
    RUNTIME    INT,
    RATING     FLOAT,
    NUM_VOTES  INT,
    PRIMARY KEY (ID)
);

CREATE FULLTEXT INDEX ft_idx_genre ON movies (GENRES);
CREATE FULLTEXT INDEX ft_idx_title ON movies (TITLE);
CREATE INDEX idx_start_year ON movies (START_YEAR);
CREATE INDEX idx_runtime ON movies (RUNTIME);
CREATE INDEX idx_rating ON movies (RATING);
CREATE INDEX idx_startyear_runtime ON movies (START_YEAR, RUNTIME);

LOAD
DATA INFILE '/var/lib/mysql-files/title.basics.tsv'
INTO TABLE movies
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(id, @titleType, @title_value, @originalTitle, @isAdult, @start_year_value, @endYear, @runtime_value, genres)
SET runtime = NULLIF(@runtime_value, '\N'),
    start_year = NULLIF(@start_year_value, '\N'),
    title = SUBSTRING(@title_value, 1, 255);