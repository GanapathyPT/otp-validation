#!/bin/bash

# clear old build
cd ./backend
rm -r static
mkdir static
# build frontend
cd ../frontend
yarn build
# copy frontend to backend
cp -r dist/* ../backend/static