module.exports = {

 savefeed: function(inputresp) {
 // var fs = require("fs");
 //var express = require('express');
 //var app = express();
 //var bodyParser = require('body-parser');
 //app.use(bodyParser.json()); // support json encoded bodies
 //app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies
 var AWS = require('aws-sdk');
 AWS.config.update({region: 'ap-south-1'});

  console.log("\n *STARTING savefeed* \n");

  // Define to JSON type
  var jsonContent = JSON.parse(inputresp);

  // Create the DynamoDB service object
  ddb = new AWS.DynamoDB({
   apiVersion: '2012-10-08'
  });

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
    console.log("Error while inserting", err);
    return "Error while processing...quitting.";
   } else {
    console.log("Data inserted successfully", data);
    return "Insertion successful";
   }
  });
 }
,
 
 getFeedDts: function(inputFeedId, callback) {

        // Define Dynamo DB
	var AWS = require("aws-sdk");
	AWS.config.update({region: 'ap-south-1'});

	//console.log("\n *STARTING* \n");
	
	var getDetails = new AWS.DynamoDB.DocumentClient()

	var table = "feed_master";

	var feedid = inputFeedId;
	//var title = "The Big New Movie";

	var params = {
		TableName: table,
		Key:{
			"feedId": feedid
		}
	};

	getDetails.get(params, function(err, data) {
		if (err) {
			console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
			callback(JSON.stringify(err, null, 2));
			//return (JSON.stringify(err, null, 2));
		} else {
			console.log(JSON.stringify(data, null, 2));
			callback(JSON.stringify(data, null, 2));
			//return (JSON.stringify(data, null, 2));
		}
	});
},

 searchFeeddetails: function(inputFeedName, callback){

  var AWS = require("aws-sdk");
 AWS.config.update({region: 'ap-south-1'});

//console.log("\n *STARTING getFeedDts* \n");

 var docClient = new AWS.DynamoDB.DocumentClient();
 var params =
{
 TableName: 'feed_master',
 IndexName: 'feedName-index',
 KeyConditionExpression: 'feedName = :feedName',
 ExpressionAttributeValues: { ':feedName': inputFeedName}
};

docClient.query(params, function(err, data) {
if (err) {
                        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
                        callback(JSON.stringify(err, null, 2));
                } else {
                        //console.log(JSON.stringify(data, null, 2));
                        callback(JSON.stringify(data, null, 2));
                }
        });


        //console.log("\n *EXIT* \n");
//module.exports.searchFeeddetails = searchFeeddetails;
}


}
