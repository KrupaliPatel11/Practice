var fs = require('fs');
var data = "New data";

fs.writeFile('msg.txt', data, function(err) {
    if(err) {
        console.log(err);
    }{
        console.log("sucessfully written");
    }
}) 

fs.readFile('msg.txt', 'utf8', function(err,data){
    if(err){
        console.log(err);
    }
    {
        console.log(data);
    }
})
