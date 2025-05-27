require("dotenv").config(); 

const db = require("./db");

const port = process.env.PORT;

const express = require('express');

const app = express();

app.use(express.json());



app.listen(port);

console.log("Backend Rodando!")

// Rota responsável pelo envio de informações para a função que insere dados de clientes no banco de dados
app.post('/client', async (req, res) => {
    // O objeto req.body contem os dados enviados pelo cliente na requisição POST
    await db.insertCustomer(req.body);
    // Envia o status 201 para indicar que um novo recurso foi criado com sucesso
    res.sendStatus(201);
    });