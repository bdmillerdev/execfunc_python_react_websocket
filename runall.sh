#!/bin/zsh

cd server & nodemon index.js
cd client & npm run start
cd pytest & py main.py