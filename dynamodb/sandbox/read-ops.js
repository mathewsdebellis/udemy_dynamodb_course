const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });
const docClient = new AWS.DynamoDB.DocumentClient();

//GET
docClient.get(
	{
		TableName: 'td_notes_sdk',
		Key: {
			user_id: 'bb',
			timestamp: 1,
		},
	},
	(err, data) => {
		if (err) {
			console.log(err);
		} else {
			console.log(JSON.stringify(data, null, 2));
		}
	}
);

// QUERY
docClient.query(
	{
		TableName: 'td_notes_sdk',
		KeyConditionExpression: 'user_id = :uid',
		ExpressionAttributeValues: {
			':uid': 'bb',
		},
	},
	(err, data) => {
		if (err) {
			console.log(err);
		} else {
			console.log(JSON.stringify(data, null, 2));
		}
	}
);

//SCAN
docClient.scan(
	{
		TableName: 'td_notes_sdk',
		FilterExpression: 'cat = :cat',
		ExpressionAttributeValues: {
			':cat': 'general',
		},
	},
	(err, data) => {
		if (err) {
			console.log(err);
		} else {
			console.log(JSON.stringify(data, null, 2));
		}
	}
);


// Batch Get Item
// Search in more than one table
docClient.batchGet(
	{
		RequestItems: {
			'td_notes_sdk': {
				Keys: [
					{
						user_id: 'bb',
						timestamp: 1,
					},
					{
						user_id: 'cc',
						timestamp: 2,
					},
				],
			},
			'td_notes': {
				Keys: [
					{
						user_id: '1a2b3c',
						timestamp: 1525919937,
					},
				],
			},
		},
	},
	(err, data) => {
		if (err) {
			console.log(err);
		} else {
			console.log(JSON.stringify(data, null, 2));
		}
	}
);
