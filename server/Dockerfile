FROM node:10-slim

WORKDIR /starter

ENV NODE_ENV production

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 80

CMD ["npm","start"]

