# Stage 1
FROM node:18.14.2-alpine as react

WORKDIR /web-app/client

COPY package*.json ./

RUN npm install

COPY ./ ./

EXPOSE 3333

CMD npm start
