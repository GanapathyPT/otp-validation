@echo off

cd "%CD%\backend"
DEL /S "static"
mkdir "static"
cd "%CD%\..\frontend"
yarn "build"
COPY  "dist/*" "%CD%\..\backend\static"