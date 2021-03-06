# syntax=docker/dockerfile:1
FROM node:current-alpine3.14
WORKDIR /app
ADD package.json /app/package.json
RUN npm config set registry http://registry.npmjs.org
RUN yarn global add @nestjs/cli
RUN yarn install
EXPOSE 3000
ADD . /app
COPY . .
RUN yarn run prebuild
RUN yarn run build
CMD ["yarn", "run", "start"]