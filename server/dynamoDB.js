const { DynamoDBClient, ScanCommand  } = require( "@aws-sdk/client-dynamodb")
const { QueryCommand, DynamoDBDocumentClient } =require( "@aws-sdk/lib-dynamodb")


const client = new DynamoDBClient({region: "us-east-1"}); // Specify your AWS region
const docClient = DynamoDBDocumentClient.from(client);

//to get all items from todos
const fetchItems = async () => {
    const params = {
        TableName: 'todos',// Your DynamoDB table name
    };

    try {
        const command = new ScanCommand(params);
        const data = await docClient.send(command);
        console.log(command)
        return data.Items; // Return the items fetched from the table
        // return command;
    } catch (error) {
        console.error('Unable to scan the table. Error:', JSON.stringify(error, null, 2));
        return [];
    }
};

//to get desire items from todos
const queryItems = async () => {
    const params = {
        TableName: 'todos',// Your DynamoDB table name
        KeyConditionExpression: 'id = :id AND user_email= :userEmail',
        ExpressionAttributeValues: {
            ':id': '0',
            ':userEmail': 'anath@chegg.com'
        },
        ConsistentRead: true,
    };

    try {
        const command = new QueryCommand(params);
        const data = await docClient.send(command);
        console.log(command)
        return data.Items; // Return the items fetched from the table
        // return command;
    } catch (error) {
        console.error('Unable to scan the table. Error:', JSON.stringify(error, null, 2));
        return [];
    }
};

module.exports= {fetchItems,queryItems};