FROM node:18.16.0-alpine3.18

WORKDIR /web-app/client

COPY package*.json ./

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]