// Table-level operations with dynamodb

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });

const dynamodb = new AWS.DynamoDB();

let params = {};

// Returns an object with List of Tables
/* dynamodb.listTables(params, (err, data) => {
	if (err) {
		console.log(err);
	} else {
		console.log(data);
	}
});

// Describe table
// Returns metadata with with [Objects]
dynamodb.describeTable(
	{
		TableName: 'td_notes',
	},
	(err, data) => {
		if (err) {
			console.log(err);
		} else {
			console.log(data);
		}
	}
);

// if we want to print it as json:

dynamodb.describeTable(
	{
		TableName: 'td_notes',
	},
	(err, data) => {
		if (err) {
			console.log(err);
		} else {
			console.log(JSON.stringify(data, null, 2));
		}
	}
);
 */
// CRUD Table
// Create Table
dynamodb.createTable(
	{
		TableName: 'td_notes_sdk',
		AttributeDefinitions: [
			{
				AttributeName: 'user_id',
				AttributeType: 'S',
			},
			{
				AttributeName: 'timestamp',
				AttributeType: 'N',
			},
		],
		KeySchema: [
			{
				AttributeName: 'user_id',
				KeyType: 'HASH', //HASH -> Partition Key
			},
			{
				AttributeName: 'timestamp',
				KeyType: 'RANGE', // RANGE -> Sort Key
			},
		],
		ProvisionedThroughput: {
			ReadCapacityUnits: 1,
			WriteCapacityUnits: 1,
		},
	},
	(err, data) => {
		if (err) {
			console.log(err);
		} else {
			console.log(data);
		}
	}
);
/* 
// Update Table
dynamodb.updateTable(
	{
		TableName: 'td_notes_sdk',
		ProvisionedThroughput: {
			ReadCapacityUnits: 2,
			WriteCapacityUnits: 1,
		},
	},
	(err, data) => {
		if (err) {
			console.log(err);
		} else {
			console.log(data);
		}
	}
);

// Delete Table
dynamodb.deleteTable(
	{
		TableName: 'td_notes_sdk',
	},
	(err, data) => {
		if (err) {
			console.log(err);
		} else {
			console.log(data);
		}
	}
); */