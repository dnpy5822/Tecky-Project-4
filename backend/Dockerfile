FROM node:lts
WORKDIR /usr/src/app
COPY . .
EXPOSE 8080
CMD yarn install && \
    yarn knex migrate:latest && \
    yarn knex seed:run && \
    node dist/server.js