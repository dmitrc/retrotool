@echo off
cd client
echo Starting webpack...
start /b webpack --watch
echo Starting HTTP server...
start /b http-server ./ -p 8080 -c-1 --cors
cd ..
cd server
echo Starting backend server...
start /b nodemon --watch index.js