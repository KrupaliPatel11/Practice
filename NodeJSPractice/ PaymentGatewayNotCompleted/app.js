const express = require('express');
const stripe = require('stripe')('sk_test_51N3DbMSHP9Afcw1wbCbZgyp2z7eqdetekpXTpMjmN47xLrNNSHwYozF4vMwYym72PrxA66Ctbm5SO5iJUyr9rqfF0066ydeO2y');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const app = express();

// handleBar middlewar
// app.engine('handlebars' , exphbs({defaultLayout : 'main'}));
app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "main" }));
app.set('view engine', 'hbs');

// body parser  middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// set static folder
app.use(express.static(`${__dirname }/public`));

// index route
app.get('/', (req, res) => {
    res.render('index');
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server Started");
})
