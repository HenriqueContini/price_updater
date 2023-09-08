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

1. Primeiro, será necessário baixar o projeto. Para isso, basta rodar o comando abaixo dentro da pasta que desejar:

```
https://github.com/HenriqueContini/price_updater.git
```

2. Dentro da pasta, será necessário baixar as dependências do projeto por meio do comando:

```
npm install
```

3. Depois, basta rodar o projeto com:

```
npm run build
npm run preview
```

## 🖼️ Spoiler
![image](https://github.com/HenriqueContini/price_updater/assets/81761545/d6f49a8f-1eac-4906-85af-f89b4e8cfe0b)

