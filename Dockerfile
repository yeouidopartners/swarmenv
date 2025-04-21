FROM node:lts-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm i

COPY . .

ENV TZ=Asia/Seoul

ENTRYPOINT [ "node", "-r", "./config.js", "index.js" ]