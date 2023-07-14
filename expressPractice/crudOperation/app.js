const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 3000;
require('./models'); 
var userCtrl = require('./controller/userController');

app.get("/", function(req,res) {
    res.send("Home page");
});
app.get("/add", userCtrl.addUser);
app.get("/crud", userCtrl.crudOp);
app.get("/query", userCtrl.queryData);

app.get("/users", userCtrl.getUsers);
app.post("/users", userCtrl.postUsers);
app.delete("/users/:id", userCtrl.deleteUsers);
app.patch("/users/:id", userCtrl.patchUsers);

app.get("/getSet", userCtrl.getSet);
app.get("/validation", userCtrl.validation);
app.get("/rawQuery", userCtrl.rawQuery);


app.listen(3000);
console.log('listening');