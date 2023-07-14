// To create a server require a http module
var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
    console.log('request was made: ' + req.url);
    // In below 200 is status
    res.writeHead(200, { 'Content-Type': 'text/html' });
    var readStream = fs.createReadStream(__dirname + '/servingHtmlPage/index.html', 'utf8');
    readStream.pipe(res);
});
// In below  3000 is port number and 127.0.0.1 is local host
server.listen(3000, '127.0.0.1');
console.log('Now Listening');