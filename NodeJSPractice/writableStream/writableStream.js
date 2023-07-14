var fs = require('fs');

var readStream = fs.createReadStream(__dirname + '/message.txt', 'utf8'); 
var writeStream = fs.createWriteStream(__dirname + '/message2.txt');
readStream.on('data', function(chunk) {
    console.log('New Chunk Received');
    writeStream.write(chunk);
});
