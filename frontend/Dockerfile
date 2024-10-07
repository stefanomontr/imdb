FROM node:20.17.0-alpine

ENV BACKEND_API=http://backend

WORKDIR /frontend

COPY package.json .
RUN npm install
RUN npm i -g serve
COPY . .
RUN npm run test
RUN npm run build

VOLUME ["/frontend/node_modules"]

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]