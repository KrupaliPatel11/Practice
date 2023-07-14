var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {
    console.log('Request was made: ' + req.url);
    if(req.url === '/home' || req.url === '/') {
        res.writeHead(200, {'Content-Type' : 'text/html'});
        fs.createReadStream(__dirname + '/indexr.html').pipe(res);
    } else if(req.url === '/contact') {
        res.writeHead(200, {'Content-Type' : 'text/html'});
        fs.createReadStream(__dirname + '/contact.html').pipe(res);
    } else if (req.url === '/api/krupali') {
        var krupali = [{name: 'Krupali', age: 20}];
        res.writeHead(200, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify(krupali));
    } else {
        res.writeHead(404, {'Content-Type' : 'text/html'});
        fs.createReadStream(__dirname + '/404.html').pipe(res);
    }
});
server.listen(3000, '127.0.0.1');
console.log('Success');