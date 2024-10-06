FROM mysql:9 AS builder

ENV MYSQL_DATABASE=IMDB
ENV MYSQL_ROOT_PASSWORD=root

COPY start-sql-server.bash .
COPY startup-scripts/*.sql .
COPY data-source/* /var/lib/mysql-files/

RUN chmod 777 start-sql-server.bash *.sql

RUN ./start-sql-server.bash && \
    echo "Creating table..." && \
    mysql -u root -proot IMDB < create-table.sql && \
    echo "Creating indices..." && \
    mysql -u root -proot IMDB < create-indices.sql && \
    echo "Uploading movies..." && \
    mysql -u root -proot IMDB < upload-movies.sql && \
    echo "Uploading ratings..." && \
    mysql -u root -proot IMDB < upload-ratings.sql

EXPOSE 3306

FROM mysql:9 AS final

COPY --from=builder /var/lib/mysql /var/lib/mysql
