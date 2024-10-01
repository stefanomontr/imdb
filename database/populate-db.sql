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