// const { Pool } = require("pg");

async function connect() {  
    const { Pool } = require("pg");

    if(global.connection)
        return global.connection.connect();

    const pool = new Pool({
      user: process.env.USER_NAME,
      host: process.env.HOST_NAME,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      dialect: process.env.DB_DIALECT,
      port: process.env.PORT_NUMBER
    });
    
    const client = await pool.connect();
    console.log("O Pool de conexão foi criado com sucesso!")
    client.release();

    global.connection = pool;
    
    return pool.connect();
  }

  connect();

  // Função para inserir clientes no banco de dados. Essa função recebe informações vindos da rota POST.
async function insertCustomer(customer) {
  // Estabelecer conexão com o banco de dados (a função "connect" deve ser definida em outro lugar)
  const client = await connect();
  // Prepara a query SQL de inserção com parâmetros para evitar SQL Injection
  const sql = "INSERT INTO client (cpf, nome, email, idade, profissao) VALUES ($1, $2, $3, $4, $5)";
  // Cria um array com os valores que serão injetados na query, na ordem correta
  const values = [customer.cpf, customer.nome, customer.email, customer.idade, customer.profissao];
  // Executa a query no banco de dados para inserir o cliente
  await client.query(sql, values);
  }
  // Exporta a função para que ela possa ser usada em outras partes do backend
  module.exports = {
  insertCustomer
  }