CREATE TEMPORARY TABLE temp_ratings (
    tconst VARCHAR(12),
    averageRating FLOAT,
    numVotes INT
);

LOAD DATA INFILE '/var/lib/mysql-files/title.ratings.tsv'
INTO TABLE temp_ratings
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(tconst, averageRating, numVotes);

UPDATE movies m
JOIN temp_ratings tr ON m.id = tr.tconst
SET
    m.rating = tr.averageRating,
    m.num_votes = tr.numVotes;

DROP TEMPORARY TABLE IF EXISTS temp_ratings;