#!/bin/bash

if [ "$#" -ne 2 ]; then
  echo "Usage: ./request.sh <url> <method>"
  echo "Bad Params"
  exit 1
fi

url="$1"
method="$2"

if [ "$method" != "GET" ] && [ "$method" != "POST" ]; then
  echo "Bad Method"
  exit 1
fi

if [ "$method" == "GET" ]; then
  curl -X GET "$url" -o output.json
elif [ "$method" == "POST" ] && [ -f "input.json" ]; then
  data="$(cat input.json)"
  curl -X POST -d "$data" "$url" -o output.json
else
  echo "bad request"
  exit 1
fi

