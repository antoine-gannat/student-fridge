FROM node:lts-alpine

#### SERVER ####

WORKDIR /app/server

COPY ./server/package*.json ./

RUN npm i

COPY ./server/. ./

RUN npm run build

# Add the openapi config
COPY ./server/src/openapi.yaml ./dist/

#### WEBAPP ####

WORKDIR /app/webapp

COPY ./webapp/package*.json ./

RUN npm i

COPY ./webapp/. ./

# build the frontend
RUN npm run build

EXPOSE 443

CMD node /app/server/dist/server.js