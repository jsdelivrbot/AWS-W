console.log("Hello ConfigureNewFeed");
var fs = require("fs");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
var utilities = require('./utilities');

app.post('/api/saveNewFeed', function (req, res) {
    console.log('post call',(JSON.stringify(req.body)))

    res.send(JSON.stringify(req.body));

//Insert into Dynamo DB
var feedstatus = utilities.savefeed(JSON.stringify(req.body));

});

app.get('/api/searchFeed',function(req,res){

    fs.readFile( __dirname + "/" + "student.json", 'utf8', function (err, data) {
        let feedName = req.query.feedName;
        let fileFormat = req.query.fileFormat;

        // all lines to be deleted from here
        let allFeeds = JSON.parse(data);

        let filterFeeds = allFeeds.feeds.filter(function(feed){
                    console.log("Full result",feed.fileFormat);


            return feed.feedName.indexOf(feedName)>-1;


        });
        // till here
      //  let filterFeeds = utilities.searchFeeddetails(feedName);
        res.send(JSON.stringify(filterFeeds));
    });
})

app.get('/api/getFeed',function(req,res){

    fs.readFile( __dirname + "/" + "student.json", 'utf8', function (err, data) {

        let feedId = req.query.feedId;
        console.log("feedId is ",feedId);
        let allFeeds = JSON.parse(data);

        let filterFeeds = allFeeds.feeds.filter(function(feed){

            return feed.feedId == feedId;

        });
        //let filterFeed = utilities.getFeedDts(feedId);
        //res.send(JSON.stringify(filterFeed.item));
        res.send(JSON.stringify(filterFeeds && filterFeeds[0]));
    });
})


    var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port);

})