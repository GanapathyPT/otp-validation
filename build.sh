#!/bin/bash

# clear old build
cd ./backend
if [ -d ./static ]; then rm -r static; fi
mkdir static
# build frontend
cd ../frontend
yarn build
# copy frontend to backend
cp -r dist/* ../backend/static