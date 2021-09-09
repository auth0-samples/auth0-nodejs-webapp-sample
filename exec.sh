#!/usr/bin/env bash
docker build -t auth0-nodejs-webapp-01-login .
docker run --env-file .env -p 3000:3000 -it auth0-nodejs-webapp-01-login
