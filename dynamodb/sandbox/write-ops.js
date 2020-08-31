// using Document Client Class

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });

const docClient = new AWS.DynamoDB.DocumentClient();

// PUT operation
// anything modified (other than pk) updates existing item
docClient.put(
	{
		TableName: 'td_notes_sdk',
		Item: {
			user_id: 'bb',
			timestamp: 2,
			title: 'my title',
			content: 'my content',
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

// UPDATE operation
docClient.update(
	{
		TableName: 'td_notes_sdk',
		Key: {
			user_id: 'bb',
			timestamp: 1,
		},
		UpdateExpression: 'set #t = :t',
		ExpressionAttributeNames: {
			'#t': 'title',
		},
		ExpressionAttributeValues: {
			':t': 'updated title',
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

// DELETE operation
docClient.delete(
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
			console.log(data);
		}
	}
);

// BATCH Write Item
// Put or delete multiple items at once

docClient.batchWrite(
	{
		RequestItems: {
			'td_notes_sdk': [
				{
					DeleteRequest: {
						Key: {
							user_id: 'bb',
							timestamp: 2,
						},
					},
				},
				{
					PutRequest: {
						Item: {
							user_id: 'bb',
							timestamp: 1,
							title: 'my title',
							content: 'my content',
						},
					},
				},
				{
					PutRequest: {
						Item: {
							user_id: 'cc',
							timestamp: 2,
							title: 'my1title',
							content: 'my 1content',
						},
					},
				},
			],
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
