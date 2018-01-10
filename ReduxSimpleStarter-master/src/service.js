console.log("Hello ConfigureNewFeed");
var fs = require("fs");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Created by Vinod Declaration starts
//var utilities = require('./utilities');
var AWS = require('aws-sdk');
AWS.config.update({region: 'ap-south-1'});
//Declaration ends

app.post('/api/saveNewFeed', function (req, res) {
    console.log('post call',(JSON.stringify(req.body)))

    res.send(JSON.stringify(req.body));

//Vinod - JSON processing
//statusmsg = utilities.savefeed((JSON.stringify(req.body)));
//console.log(statusmsg);
// Define to JSON type
var jsonContent = JSON.parse((JSON.stringify(req.body)));

// Create the DynamoDB service object
ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});

//Put new record in the table
var params = {
  TableName: 'feed_master',
  Item: {
    'feedId' : {S: jsonContent.feedId},
	'feedName' : {S: jsonContent.feedName},
	'feedSubject' : {S: jsonContent.feedSubject},
	'feedTarget' : {S: jsonContent.feedTarget},
	'feedFrequency' : {S: jsonContent.feedFrequency},
	'feedWeekday' : {S: 'NA'},
	'feedWeekend' : {S: 'NA'},
	'feedUsHoliday' : {S: 'NA'},
	'vendorSrcDataPoint' : {S: jsonContent.vendorSrcDataPoint},
	'resourcePath' : {S: jsonContent.resourcePath},
	'filePattern' : {S: jsonContent.filePattern},
	'fileFormat' : {S: jsonContent.fileFormat},
	'noOfFiles' : {S: jsonContent.noOfFiles},
	'failureTolerance' : {S: jsonContent.failureTolerance},
	'retentionPeriod' : {S: jsonContent.retentionPeriod},
	'tokenFile' : {S: jsonContent.tokenFile},
	'loadingMode' : {S: jsonContent.loadingMode},
	'extTablePush' : {S: jsonContent.extTablePush},
	'tableNameCredentials' : {S: jsonContent.tableNameCredentials},
	'compression' : {S: jsonContent.compression},
	'encryption' : {S: jsonContent.encryption},
	'feedNotificationSubscription' : {S: jsonContent.feedNotificationSubscription},
	'dataControl' : {S: jsonContent.dataControl},
  }
};

// Call DynamoDB to add the item to the table
ddb.putItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
	return "Operation completed";
  } else {
    console.log("Success", data);
	return "Error while processing...quitting.";
  }
});
//Vinod - End of code for JSON processing

});

app.get('/api/getNewFeed',function(req,res){

    fs.readFile( __dirname + "/" + "student.json", 'utf8', function (err, data) {
        console.log( data );
       // res.end( data );
        res.send(JSON.stringify(data));
    });
})


var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port);

})
