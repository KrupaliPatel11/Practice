const express = require('express');
const app = express();
const User = require('../auth/model/user');
const bodyParser = require("body-parser")
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT_AUTH;

// Bodyparser middleware
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

// Connect Postgres
const { Client } = require('pg')
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'ecommerce',
    password: 'ztlab131',
    port: 5433
});
client.connect(function (err) {
    if (err) throw err;
    console.log("Postgres Connected!");
});

// Registration Route
app.post('/auth/signup', async (req, res) => {
    const { email, username, password } = req.body;
    
})


app.listen(port, () => {
    console.log(`Auth Service Listening At http://localhost:${port}`);
})