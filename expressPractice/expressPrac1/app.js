const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');

// Establish connection
const {MongoClient} = require('mongodb')
const url = 'mongodb://krupalip:mJ307ySceDhxuJInLr9C@15.206.7.200:28017'
const client = new MongoClient(url);
const dbname = 'krupalip';

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Globals 
app.use(function(req, res, next) {
    res.locals.errors = null;
    next();
})

// Express-validator middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            Param: formParam,
            msg: msg,
            value: value
        };
    }
}));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set Static Path
app.use(express.static(path.join(__dirname, 'public')));

var users = []

// fetch data in collection named customerApp 
app.get('/', async function(req, res){
    await client.connect();
    const db  = client.db(dbname);
    const collection = db.collection('customerApp');
    const rs = await collection.find({}).toArray();
    res.render('index' , {
                title: '',
                users: rs
            });
});

// validation 
app.post('/users/add', function(req, res) {
    req.checkBody('firstName', 'First Name is required').notEmpty();
    req.checkBody('lastName', 'Last Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();

    var errors = req.validationErrors();
    
    if(errors) {
        res.render('index' , {
            title: 'Customer',
            users: users,
            errors : errors
        });
    }else {
        var newUser = {
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email: req.body.email
        }
        dbname.customerApp.insert(newUser, function(err, result) {
            if(err) {
                console.log(err);
            } 
            res.redirect('/');
        })
    }
  
});

app.listen(3000);
console.log("Listening");