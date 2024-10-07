FROM mysql:9 AS builder

ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=IMDB
ENV MYSQL_HOST=localhost
ENV FRONTEND_HOST=localhost

# manual openjdk17 installation copyied from official image
ENV JAVA_HOME=/usr/java/openjdk-17
COPY --from=openjdk:17 $JAVA_HOME $JAVA_HOME
ENV PATH=$JAVA_HOME/bin:$PATH

WORKDIR /backend
COPY . .
COPY .mvn/ .mvn/

# Start SQL server, run full build with SpringBoot tests
RUN chmod 777 start-test-sql-server.bash
RUN ./start-test-sql-server.bash && ./mvnw clean install

FROM openjdk:17 AS final

WORKDIR /backend
COPY --from=builder /backend/target/imdb-*.jar .

EXPOSE 8080

HEALTHCHECK --interval=3s --timeout=10s --retries=10 \
    CMD curl --silent http://localhost:8080/actuator/health/readiness | grep -q "{\"status\":\"UP\"}" || exit 1

CMD java -jar imdb-*.jar