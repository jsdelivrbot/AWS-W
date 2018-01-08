console.log("Hello Gagan");
var fs = require("fs");
var express = require('express');
var app = express();


var user = {
    "user4" : {
        "name" : "mohit",
        "password" : "password4",
        "profession" : "teacher",
        "id": 4
    }
}

app.post('/saveNewFeed', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    // fs.readFile(__dirname + "/" + "student.json", 'utf8', function (err, data) {
    //  data = JSON.parse(data);
    //  data["user4"] = user["user4"];
    // console.log(data);
    //  res.end(JSON.stringify(data));
    // res.end(data);
    res.send("ELLO");
    // console.log(req);
    //res.end("ELLO");
    // res.end(JSON.stringify(req));
    // });
})

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port);

})