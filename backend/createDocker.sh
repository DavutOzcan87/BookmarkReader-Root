#!/bin/bash

set -e

npm install

docker build --no-cache . -t bookmarkreader-backend