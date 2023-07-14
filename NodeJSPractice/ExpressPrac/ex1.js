var express = require('express');
var app = express();

app.get('/', function(req,res) {
    res.send('This is the homepage');
});

app.get('/contact', function(req,res) {
    res.send('This is the Contact page');
});
app.get('/profile/:name', function(req, res){
    res.send('you requested to see profile with the id of ' + req.params.name);
});

app.listen(3000);