var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/node-demo");
var nouveauPatient = new mongoose.Schema({
    lastName: String,
    firstName: String,
    date: Number
});
var User = mongoose.model("User", nouveauPatient);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/addname", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("enregistrement effectuer merci");
        })
        .catch(err => {
            res.status(400).send("l'enregistrement n'a pas ete effectuer");
        });
});

app.listen(port, () => {
    console.log(port);
});