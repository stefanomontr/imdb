CREATE FULLTEXT INDEX ft_idx_genre ON movies (GENRES);
CREATE FULLTEXT INDEX ft_idx_title ON movies (TITLE);
CREATE INDEX idx_start_year ON movies (START_YEAR);
CREATE INDEX idx_runtime ON movies (RUNTIME);
CREATE INDEX idx_rating ON movies (RATING);
CREATE INDEX idx_startyear_runtime ON movies (START_YEAR, RUNTIME);