#!/usr/bin/env sh

# wait-for-it.sh script to wait for a service to be ready before starting the app
host="$1"
port="$2"
shift 2
cmd="$@"

# Wait until the database service is up
while ! nc -z "$host" "$port"; do
  echo "waiting for $host:$port..."
  sleep 1
done

echo "$host:$port is available, starting the application..."
exec $cmd