var express = require('express');
var EventEmitter = require('events');
var app = express()
var event = new EventEmitter();

let count = 0;

event.on('countAPI', ()=> {
    count++;
    console.log('event called', count);
})

app.get("/", ()=> {
    response.send('api called');
    event.emit('countAPI');
});
app.get("/serach", ()=> {
    response.send(' search api called');
    event.emit('countAPI');
});
app.get("/update", ()=> {
    response.send('update api called');
    event.emit('countAPI');
});
app.listen(5000);
// not working

