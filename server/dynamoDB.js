const { DynamoDBClient, ScanCommand  } = require( "@aws-sdk/client-dynamodb")
const { PutCommand, QueryCommand, DynamoDBDocumentClient, UpdateCommand } =require( "@aws-sdk/lib-dynamodb")

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
const queryItems = async (userEmail) => {
    const params = {
        TableName: 'todos',// Your DynamoDB table name
        KeyConditionExpression: 'user_email= :userEmail',
        ExpressionAttributeValues: {
            ':userEmail': userEmail
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
        console.error('Unable to query the table. Error:', JSON.stringify(error, null, 2));
        return [];
    }

};

//to create a todo
const createItem = async (id, user_email, title, progress, date) => {
    const params = {
        TableName: 'todos',
        Item: {
            id: id,
            user_email: user_email,
            title: title,
            progress: progress,
            date: date
        }
    };

    try {
        const command = new PutCommand(params);
        const response = await docClient.send(command);
        console.log(response);
        console.log('Item added successfully');
    } catch (error) {
        console.error('Unable to add item. Error:', JSON.stringify(error, null, 2));
    }
};

//to edit a todo
const editItem = async () => {
    // Implementation for editing an item
    const params = {
        TableName: 'todos',
        Key: {
            id: id
        },
        UpdateExpression: 'set title = :title, progress = :progress',
        ExpressionAttributeValues: {
            ':title': title,
            ':progress': progress
        }
    };
    try {
        const command = new UpdateCommand(params);
        const response = await docClient.send(command);
        console.log(response);
        console.log('Item updated successfully');
    } catch (error) {
        console.error('Unable to update item. Error:', JSON.stringify(error, null, 2));
    }
};
module.exports= {fetchItems,queryItems,createItem};