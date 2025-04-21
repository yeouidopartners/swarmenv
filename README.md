## SwarmEnv

SwarmEnv는 docker swarm에서의 mount된 secrets (/run/secrets/\*) 를 런타임에서 환경변수로 가져옵니다.

Ex) MY_SECRET_FILE 환경변수 파일은 MY_SECRET 으로 Injection 됩니다.

### Usage

```yaml
# docker-compose.yml

services:
  app:
    image: test
    deploy:
      replicas: 1
      update_config:
        parallelism: 1
        delay: 15s
        order: start-first
      restart_policy:
        condition: any
        delay: 5s
        window: 120s
    secrets:
      - service.secret
    environment:
      # mounted secret path envs must be endswith _FILE
      - MY_SECRET_FILE=/run/secrets/service.secret

secrets:
  service.secret:
    external: true
```

```sh
# Dockerfile

FROM node:lts-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm i

COPY . .

ENV TZ=Asia/Seoul

RUN pnpm build

ENTRYPOINT [ "node", "-r", "@yeouidopartners/swarmenv/config", "dist/index.js" ]
```

test injected value

```sh
docker container exec -it [id] echo $MY_SECRET
```
