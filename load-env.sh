#!/bin/bash

#check if an environment arguement is provided
if [ -z "$1" ]; then
  echo "usage: ./load-env.sh [development|test|production]"
  exit 1
fi

#set environment file base on the argument
ENV_FILE=".env.$1"

#chekc if he environment file exists
if [ ! -f "$ENV_FILE" ]; then
  echo "Error: $ENV_FILE not found!"
  exit 1
fi

# Export variables from the specified environment file
export $(grep -v '^#' "$ENV_FILE" | xargs)

echo "Environment set to $1"
echo "Using $ENV_FILE for configuration. "
