docker build -t auth0-nodejs-webapp-02-user-profile .
docker run --env-file .env -p 3000:3000 -it auth0-nodejs-webapp-02-user-profile
