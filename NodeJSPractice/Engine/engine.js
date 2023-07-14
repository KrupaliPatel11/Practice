// var express = require('express');
// var app = express();



// app.set('view engine', 'ejs');
// // app.set('views', path.join(__dirname, 'views'));

// app.get('/', function(req,res) {
//     res.sendFile(__dirname + '/index.html');
// });
// app.get('/contact', function(req, res) {
//     res.sendFile(__dirname + '/contact.html');
// });
// app.get('/profile/:id' , function(req,res) {
//     res.render('profile');
    
// });
// app.listen(3000, '127.0.0.1');

// console.log(__dirname);






var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req,res) {
    res.sendFile(__dirname + '/views/index.html');
});
app.get('/contact', function(req, res) {
    res.sendFile(__dirname + '/views/contact.html');
});
app.get('/profile/:name' , function(req,res) {
    // var data = {age: 21, job:'zignuts'};
    res.render('profile');
    // {person : req.params.name, data: data}
});
app.listen(3000, '127.0.0.1');

console.log(__dirname);