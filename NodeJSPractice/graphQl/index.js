const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { graphqlHTTP } = require('express-graphql');

const schema = require('./schema')

require('./model')
app.use(express.json())
app.use('/graphql',
    graphqlHTTP({
        schema,
        graphiql: true
    })
)

app.listen(port, () => {
    console.log("Server Started");
})