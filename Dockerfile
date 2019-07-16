FROM node:8.12.0

WORKDIR /imgDiff

COPY ./server/package.json .

RUN npm i -g yarn@1.17.3
RUN yarn install --production

WORKDIR /imgDiff

COPY ./server/index.js ./index.js
COPY ./server/handlers ./handlers

ENV NODE_ENV production

CMD ["node", "index.js"]