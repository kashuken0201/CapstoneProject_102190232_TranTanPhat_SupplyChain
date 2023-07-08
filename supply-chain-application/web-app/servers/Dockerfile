FROM node:18.16.0-alpine3.18

WORKDIR /web-app/servers

COPY package*.json ./

RUN npm install

EXPOSE 5000

CMD ["npm", "start"]