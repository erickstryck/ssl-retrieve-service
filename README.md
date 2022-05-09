## Description

Este projeto foi desenvolvido para verificação dos certificados SSL de domínios. O serviço consiste em receber uma determinada URL e fazer a leitura do certificado de segurança e realizar uma validação, posteriormente os dados são armazenados em um banco de dados não relacional ([MongoDB](https://www.mongodb.com/docs/)).

## Let's start

O projeto executa a partir de um container docker, para que possa executar é necessário que o docker esteja instalado, para instalar o docker siga as instruções deste [link](https://docs.docker.com/get-docker/).

O projeto conta com três containers, o primeiro é o container do serviço web, o segundo se trata do container do [MongoDB](https://www.mongodb.com/docs/) e o terceiro do [MongoExpress](https://github.com/mongo-express/mongo-express).

Com o docker instalado você deve fazer o download do projeto ou fazer o clone do repositório usando o [GIT](https://git-scm.com/doc), após o download ou o clone do projeto você poderá subir os containers executando o seguinte comando no diretório raiz:

```bash
$ docker compose up
```
Serão instaladas todas as dependências nos containers do [Docker](https://docs.docker.com/get-started/), ao final do processo podemos acessar os serviços pelos seguintes endpoints:

- http://localhost:3000/api/ (Swagger do serviço web)
- http://localhost:8081/db/test/certs (MongoExpress para visualização dos dados por um painel web)

## Utilizando o serviço

Com os containers sendo executados podemos usar a interface do [Swagger](https://swagger.io/docs/) para realizar as validações dos domínios, os passos a seguir devem ser executados:

1. Acione o Botão `Try it out` para exibir a entrada da requisição
2. Adicione uma url ao corpo da requisição ex: (`"targetUrl": "https://sample.com"`)
3. Acione o Botão `Execute` para obter a resposta

Na interface do swagger possuem as informações necessárias para o uso do serviço.

Caso queira poderá realizar a requisição em ferramentas como [Postman](https://learning.postman.com/docs/getting-started/introduction/).

## Visualizando os dados

Com os containers sendo executados, para a visualização dos dados armazenados basta acessar o link (http://localhost:8081/db/test/certs) será exibida uma lista com as validações feitas anteriormente.

Os dados são inseridos no banco apenas para relatórios manuais e a API não possui endpoints para seu consumo.

## Sobre o projeto


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
