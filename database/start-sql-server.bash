/usr/local/bin/docker-entrypoint.sh mysqld &

until mysqladmin ping -h"localhost" --silent;
  do echo 'Waiting for MySQL...';
  sleep 2;
done;