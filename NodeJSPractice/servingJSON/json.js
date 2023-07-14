var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type' : 'application/json'});
    var myObj = {
        name : 'Krupali',
        Age : 20,
        City : 'surat'
    };
    res.end(JSON.stringify(myObj));
});
server.listen(3000, '127.0.0.1');
console.log('success');