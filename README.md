## Description

This project was developed to verify domain SSL certificates. The service consists of receiving a certain URL, reading the security certificate, and performing a validation, later the data is stored in a non-relational database ([MongoDB](https://www.mongodb.com/docs/)).

## Quick start

The project runs from a docker container so it is necessary that docker is installed, to install docker follow the instructions in this [link](https://docs.docker.com/get-docker/).

The project has three containers, the first is the web service container, the second is the [MongoDB](https://www.mongodb.com/docs/) container and the third is [MongoExpress](https://github.com/mongo-express/mongo-express).

With docker installed, you must download the project or clone the repository using [GIT](https://git-scm.com/doc), after downloading or cloning the project you can create containers by running the following command in the project root directory:

```bash
$ docker compose up
```
All dependencies will be installed during the construction of the containers, at the end of the process we can access the services through the following endpoints:

- http://localhost:3000/api/ (Web service swagger)
- http://localhost:9000/db/test/certs (Mongo Express for Visualizing Data in a Web Dashboard)

## Using the service

With the containers running, we can use the [Swagger](https://swagger.io/docs/) interface to perform domain validations, perform the following steps:

1. Access Swagger (http://localhost:3000/api/)
2. Press the (`Try it out`) button to display the input field
3. Add a URL to the request body eg (`"targetUrl": "https://sample.com"`)
4. Press the (`Execute`) button to get the validation response

The Swagger web interface has the instructions needed to use the service, the interface has examples of the request and response schemes.

If you want, you can also make the request in tools like [Postman](https://learning.postman.com/docs/getting-started/introduction/).

## Using the service locally (without using Docker)

To run the service locally, you must install NodeJs LTS version 16.15.0 or higher, follow the steps in this [Link](https://nodejs.org/en/download/) to install NodeJs.

It is recommended to install [Yarn](https://yarnpkg.com) to run the project.

It is necessary to install [MongoDB](https://www.mongodb.com/docs/manual/installation/) to perform data persistence. After installing mongo, you must configure the connection string with the same user and password used in the project, configure as shown in the example:
```
mongodb://guest:sample@mongo:27017/
```
With the previous steps completed, we can execute the sequence of commands below:

```bash
$ yarn global add @nestjs/cli
$ yarn install
$ yarn run test
$ yarn run test:e2e
$ yarn start
```
After the commands are successfully executed, you can access Swagger at the following link http://localhost:3000/api/ and use the service.

## Viewing the data

With the MongoExpress container running, just access the link (http://localhost:9000/db/test/certs) to view the stored data, a list of previously performed validations will be displayed.

The data entered in the database is for history only, the API does not have endpoints for its consumption.
## Testing

To run the automated tests, you must access the web service container, the steps on how to access the container are described in the following document ([docker exec](https://docs.docker.com/engine/reference/commandline/exec/)).

To perform the tests manually, run the following commands inside the container:

```bash
$ yarn run test
$ yarn run test:cov
$ yarn run test:e2e
```
## Logs

To view the application logs it is necessary to execute some docker commands according to the [docker logs](https://docs.docker.com/engine/reference/commandline/logs/) documentation.

## About the project

The project was developed using the [NestJs](https://docs.nestjs.com/) Framework using JavaScript with the [TypeScript](https://www.typescriptlang.org/docs/) syntax, the architecture follows the standards recommended by the Framework.
## Notes

This project was developed to be just a skill test, it should not be used in a production environment.
