FROM node

WORKDIR /imgDiff

COPY ./server/package.json .

RUN npm i -g yarn
RUN yarn install --production

WORKDIR /imgDiff

COPY ./server/index.js ./index.js
COPY ./server/handlers ./handlers

ENV NODE_ENV production

CMD ["node", "index.js"]