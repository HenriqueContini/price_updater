<h1 align="center">Price Updater</h1>

## 🖥️ Projeto

Este é o resultado de um desafio técnico full-stack utilizando TypeScript da empresa Shopper.

Cenário: Em qualquer empresa de e-commerce é essencial que os usuários possam atualizar os preços de
suas lojas para se manterem competitivos e manterem seus preços alinhados com os custos de
operação. Essa tarefa parece simples, porém quando falamos de lojas com milhares de produtos,
se torna essencial a existência de uma ferramenta que permita atualizar os produtos de forma
massiva e com recursos adicionais para evitar erros que possam prejudicar o negócio

## 📝 Descrição

A aplicação possui um front-end, feito com React e Material UI, onde, é possível anexar um arquivo CSV com o código do produto e o novo preço. 
Ao clicar em validar, a aplicação irá checar se o arquivo respeita todas as regras de negócio e, em caso de sucesso, permite atualizar o valor no banco de dados, em caso de falha, irá mostrar a lista de produtos com seus respectivos problemas.

Em relação ao back-end (Express e TypeORM), ao fazer uma requisição para: `/checkFile`, irá retornar todos os produtos e, caso haja, seus problemas.
Caso os produtos não tenham nenhum problema, será possível fazer uma requisição para `/updatePrice`, que irá persistir os dados no banco de dados (MySQL).

## ⚙️ Tecnologias

- TypeScript
- React
- Material UI
- Styled Components
- Vite
- Express
- TypeORM
- MySQL

## 🏃‍♂️ Rodar projeto

### 1. Clonando o projeto
Primeiro, será necessário baixar o projeto. Para isso, basta rodar o comando abaixo dentro da pasta que desejar:
```
git clone https://github.com/HenriqueContini/price_updater.git
```
Depois, acesse a pasta criada: `cd price_updater`.

### 2. Back-end
Dentro da pasta do projeto, será necessário acessar a pasta back-end `cd backEnd`. Dentro dela, será necessário rodar o comando:
```
npm install
```
Depois de baixar as dependências, será necessário configurar o banco de dados, para isso, com uma IDE (vscode), basta acessar o arquivo `src/database/data-source.ts` e modificar as configurações com base no seu banco de dados local:

![image](https://github.com/HenriqueContini/price_updater/assets/81761545/4a731ab6-aa3e-44ee-9298-b026b5912586)

Para criar as tabelas com os dados, por meio da migration do TypeORM, basta rodar:
```
npm run typeorm migration:run -- -d src/database/data-source.ts
```
Por fim, basta rodar o back-end por meio do comando:
```
npm run dev
```
Obs: Certifique-se de que a porta 3000 não esteja sendo usada.

### 3. Front-end
Para rodar o front-end, será necessário acessar a pasta raiz do projeto `price_updater`, e, depois, acessar a pasta front-end: `cd front-end`
Dentro dela, será necessário baixar as dependências:
```
npm install
```
Por fim, basta rodar o front-end com o comando:
```
npm run dev
```
Que irá abrir no link: `http://localhost:5173/`

## 🖼️ Spoiler
![image](https://github.com/HenriqueContini/price_updater/assets/81761545/d6f49a8f-1eac-4906-85af-f89b4e8cfe0b)

