var express = require('express');
var app = express();

app.search('view engine', 'ejs');

app.get('/', function(req,res) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/contact', function(req, res) {
    res.sendFile(__dirname + '/contact.html');
});
app.get('/profile'/':id' , function(req,res) {
    res.send('you requested to see profile with the id of ' + req.params.name);
});
app.listen(3000, '127.0.0.1');