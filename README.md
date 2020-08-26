# Proffy-2.0-API

>API em NodeJS para a plataforma Proffy desenvolvida na NLW#2 da Rocketseat.

Essa API conta, até o momento, com:

1. Login de usuário gerando um JWT
2. Envio de uma nova senha para o usuário com Nodemailer e Mailtrap.
3. Criação de um novo usuário.

## Para começar

Depois de clonar esse repositório, rode o comando abaixo para instalar todas as dependências:

```sh
yarn install
```

## Sobre variáveis de ambiente.

O Mailtrap para funcionar precisa de um usuário e senha específicos para sua conta. Para esconder esses dados, essa API usa variávis de ambiente.
Na raiz do projeto, crie um arquivo `.env` e coloque as variáveis da seguinte maneira:

```sh
MAILTRAP_USER=<Seu código de usuário>
MAILTRAP_PASSWORD=<Senha para seu usuário>
```
Não enqueça de criar um arquivo `.gitignore` e colocar o `.env` nele junto com a pasta do `node_modules` caso vc queira subir sua API em um repositório.

Você não vai querer seu usário e sua senha rodando por aí, não é mesmo?
