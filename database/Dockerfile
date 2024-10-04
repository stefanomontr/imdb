FROM mysql:9 as builder

ENV MYSQL_DATABASE=IMDB
ENV MYSQL_ROOT_PASSWORD=root

COPY start-sql-server.bash .
COPY populate-db.sql .
COPY data-source/title.basics.tsv /var/lib/mysql-files/

RUN chmod 777 start-sql-server.bash populate-db.sql
RUN ./start-sql-server.bash && mysql -u root -proot IMDB < populate-db.sql

EXPOSE 3306

FROM mysql:9 as final

COPY --from=builder /var/lib/mysql /var/lib/mysql

#CMD ["bash"]

