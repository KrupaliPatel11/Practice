const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const validator = require('express-validator')


// Connection establish with mongoDB
const connect = mongoose.connect('mongodb://krupalip:mJ307ySceDhxuJInLr9C@15.206.7.200:28017');
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"))
db.once('open', () => {
    console.log('Connected to mongoDB');
})

// Init App
const app = express()

// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// set public folder
app.use(express.static(path.join(__dirname, 'public')))

// Body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Express session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

// Express-validator
// app.use( validator({
//     errorFormatter: function (param, msg, value) {
//         const namespace = param.split('.'),
//             root = namespace.shift(),
//             formParam = root;
//         while (namespace.length) {
//             formParam += '[' + namespace.shift() + ']';
//         }
//         return {
//             param: formParam,
//             msg: msg,
//             value: value
//         }
//     }
// }))


// Set router
const pages = require('./routes/pages')
const adminPages = require('./routes/adminPages')

app.use('/admin/pages', adminPages)
app.use('/', pages)

const port = 3000
app.get('/', (req, res) => {
    res.send(`Listening`)
})

app.listen(port, () => {
    console.log(`Server Listening to http://localhost:${port}`);
})