console.log("Hello ConfigureNewFeed");
var fs = require("fs");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


var user = {
    "user4" : {
        "name" : "mohit",
        "password" : "password4",
        "profession" : "teacher",
        "id": 4
    }
}

app.post('/api/saveNewFeed', function (req, res) {
    console.log('post call',req.body)

    res.send(JSON.stringify(req.body));
});

app.get('/api/getNewFeed',function(req,res){

    res.send({"message":"Hello"});
})

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port);

})