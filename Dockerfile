FROM node

WORKDIR /imgDiff

COPY ./package.json .

RUN npm i -g yarn
RUN yarn install --production

WORKDIR /imgDiff

COPY ./index.js ./index.js
COPY ./handlers ./handlers

ENV NODE_ENV production

CMD ["node", "index.js"]