var fs = require("fs");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
var AWS = require('aws-sdk');
AWS.config.update({region: 'ap-south-1'});

function savefeed1() {
	console.log("test");
}

function savefeed(inputresp) {

console.log("\n *STARTING savefeed* \n");

// Define to JSON type
var jsonContent = JSON.parse(inputresp);

// Get Value from JSON
console.log("Feed Name:", jsonContent.feedName);
console.log("Feed Format:", jsonContent.feedFormat);
console.log("Feed Type:", jsonContent.feedType);

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
	'feedWeekday' : {S: jsonContent.feedWeekday},
	'feedWeekend' : {S: jsonContent.feedWeekend},
	'feedUsHoliday' : {S: jsonContent.feedUsHoliday},
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
}

