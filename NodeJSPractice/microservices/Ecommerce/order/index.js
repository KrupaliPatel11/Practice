const express = require('express');
const app = express();
const port = process.env.PORT_AUTH ;
console.log()

const { Client } = require('pg')
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'ecommerce',
  password: 'ztlab131',
  port: 5433
});

client.connect(function(err) {
  if (err) throw err;
  console.log("Postgres Connected!");
});

app.use(express.json());

app.listen(port, () => {
    console.log(`Auth Service Listening At http://localhost:${port}`);
})