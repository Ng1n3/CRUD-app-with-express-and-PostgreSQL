#!/bin/sh

# Check if an environment argument is provided
if [ -z "$1" ]; then
  echo "usage: ./load-env.sh [development|test|production]"
  exit 1
fi

# Set environment file based on the argument
ENV_FILE=".env.$1"

# Check if the environment file exists
if [ ! -f "$ENV_FILE" ]; then
  echo "Error: $ENV_FILE not found!"
  exit 1
fi

# Export variables from the specified environment file
# This will work in sh as well, but we need to handle spaces correctly
# 'grep' and 'xargs' may need to be adjusted depending on the environment
grep -v '^#' "$ENV_FILE" | while IFS= read -r line; do
  # Use 'eval' to export each variable
  eval "export $line"
done

echo " -> Environment set to $1"
echo " -> Using $ENV_FILE for configuration."