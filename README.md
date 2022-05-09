## Description

Este projeto foi desenvolvido para verificação dos certificados SSL de domínios. O serviço consiste em receber uma determinada URL, fazer a leitura do certificado de segurança e realizar uma validação, posteriormente os dados são armazenados em um banco de dados não relacional ([MongoDB](https://www.mongodb.com/docs/)).

## Let's start

O projeto executa a partir de um container docker, para que possa executar é necessário que o docker esteja instalado, para instalar o docker siga as instruções deste [link](https://docs.docker.com/get-docker/).

O projeto conta com três containers, o primeiro é o container do serviço web, o segundo se trata do container do [MongoDB](https://www.mongodb.com/docs/) e o terceiro do [MongoExpress](https://github.com/mongo-express/mongo-express).

Com o docker instalado você deve fazer o download do projeto ou fazer o clone do repositório usando o [GIT](https://git-scm.com/doc), após o download ou o clone do projeto você poderá subir os containers executando o seguinte comando no diretório raiz:

```bash
$ docker compose up
```
Serão instaladas todas as dependências durante a construção dos containers, ao final do processo podemos acessar os serviços pelos seguintes endpoints:

- http://localhost:3000/api/ (Swagger do serviço web)
- http://localhost:8081/db/test/certs (MongoExpress para visualização dos dados por um painel web)

## Utilizando o serviço

Com os containers sendo executados podemos usar a interface do [Swagger](https://swagger.io/docs/) para realizar as validações dos domínios, os passos a seguir devem ser executados:

1. Acione o Botão (`Try it out`) para exibir a entrada da requisição
2. Adicione uma URL ao corpo da requisição ex: (`"targetUrl": "https://sample.com"`)
3. Acione o Botão (`Execute`) para obter a resposta

A interface web do swagger possue as informações necessárias para o uso do serviço.

Caso queira, poderá realizar a requisição em ferramentas como [Postman](https://learning.postman.com/docs/getting-started/introduction/).

## Utilizando o serviço localmente (sem o uso do Docker)

Para que o serviço possa ser executado localmente deve-se instalar o NodeJs vesão LTS 16.15.0 ou superior, siga os passos neste [Link](https://nodejs.org/en/download/) para instalar o NodeJs.

É recomendado a instalação do [Yarn](https://yarnpkg.com) para a execução do projeto.

É necessário a instalação do [MongoDB](https://www.mongodb.com/docs/manual/installation/) para que possa haver a persistência dos dados. Após a instalação do mongo o mesmo deve ser configurado para o funcionamento com seguinte connection string `mongodb://guest:sample@mongo:27017/`.

Com os passos anteriores concluídos podemos então executar a sequencia de comandos abaixo:

```bash
$ yarn global add @nestjs/cli
$ yarn install
$ yarn run test
$ yarn run test:e2e
$ yarn start
```
Após os comandos serem executados deve ser possível acessar o Swagger com sucesso no seguinte link http://localhost:3000/api/ e utilizar a serviço.

## Visualizando os dados

Com o container do MongoExpress executando, basta acessar o link (http://localhost:8081/db/test/certs) para a visualização dos dados armazenados, será exibida uma lista com as validações feitas anteriormente.

Os dados são inseridos no banco apenas para histórico, a API não possui endpoints para seu consumo.

## Sobre o projeto

O projeto foi desenvolvido com o uso da Framework [NestJs](https://docs.nestjs.com/) utilizando JavaScript com a sintaxe [TypeScript](https://www.typescriptlang.org/docs/), a arquitetura segue os padrões estipulados pela Framework.

## Testando

Para que se possa executar os testes automatizados deve-se acessar o container do serviço web, o procedimento de como acessar o container estão descritos no seguinte documento ([docker exec](https://docs.docker.com/engine/reference/commandline/exec/)).

Caso deseje realizar os testes manualmente execute os seguintes comandos dentro do container:

```bash
$ yarn run test
$ yarn run test:cov
$ yarn run test:e2e
```
### Logs

Para que se possa visualizar os logs da aplicação é necessário executar comandos do docker conforme a documentação [docker logs](https://docs.docker.com/engine/reference/commandline/logs/).

## Notas

Este projeto foi desenvolvido para ser apenas um testes de habilidade, o mesmo não deve ser utilizado em ambiente de produção.
