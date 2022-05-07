# syntax=docker/dockerfile:1
FROM node:current-alpine3.14
WORKDIR /code
ENV HOST=0.0.0.0
RUN npm i -g @nestjs/cli
EXPOSE 3000
COPY . .
# CMD ["yarn", "start"]
CMD ["yarn", "run", "start:debug"]