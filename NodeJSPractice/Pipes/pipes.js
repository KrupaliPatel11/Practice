var fs = require('fs');
var readStream = fs.createReadStream('pipe1.txt');
var writeStream = fs.createWriteStream('pipe2.txt');
readStream.pipe(writeStream);