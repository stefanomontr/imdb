FROM node:20.17.0-alpine

ENV BACKEND_API=http://backend

WORKDIR /frontend

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5173

VOLUME ["/app/node_modules"]

CMD ["npm", "run", "dev"]