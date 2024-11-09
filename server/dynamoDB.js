const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb")
const { DynamoDBDocumentClient, PutCommand, QueryCommand, UpdateCommand, DeleteCommand } = require("@aws-sdk/lib-dynamodb")

const client = new DynamoDBClient({ region: "us-east-1" }); // Specify your AWS region
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
    if (!userEmail) {
        console.error('Invalid input: id and user_email must be provided');
        return [];
    }
    const params = {
        TableName: 'todos',// Your DynamoDB table name
        IndexName: 'user_email-index',
        KeyConditionExpression: 'user_email= :user_email',
        ExpressionAttributeValues: {
            ':user_email': userEmail
        },
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

//to create a todo (postData)
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
        return response
    } catch (error) {
        console.error('Unable to add item. Error:', JSON.stringify(error, null, 2));
    }
};

//to edit a todo (editData)
const editItem = async (id, user_email, title, progress, date) => {
    // Implementation for editing an item
    const params = {
        TableName: 'todos',
        Key: {
            id: id,
            user_email: user_email
        },
        UpdateExpression: 'set #t = :title, #p = :progress, #d = :date',
        ExpressionAttributeNames: {
            '#t': 'title',
            '#p': 'progress',
            '#d': 'date'
        },
        ExpressionAttributeValues: {
            ':title': title,
            ':progress': progress,
            ':date': date
        },
        ReturnValues: 'UPDATED_NEW'
    };
    try {
        const command = new UpdateCommand(params);
        const response = await docClient.send(command);
        console.log(response);
        console.log('Item updated successfully');
        return response;
    } catch (error) {
        console.error('Unable to update item. Error:', JSON.stringify(error, null, 2));
    }
};

//to delete a node
const deleteItem = async (id, user_email) => {
    const params = {
        TableName: 'todos',
        Key: {
            id: id,
            user_email: user_email
        },
    };
    try {
        const command = new DeleteCommand(params);
        const response = await docClient.send(command);
        console.log(response);
        console.log('Item deleted successfully');
        return response;
    } catch (error) {
        console.error('Unable to delete item. Error:', JSON.stringify(error, null, 2));
    }
}

//to sign up
const signUp = async (email, hashedPassword) => {
    const params = {
        TableName: 'users',
        Item: {
            email: email,
            password: hashedPassword
        }
    };
    try {
        const command = new PutCommand(params);
        const response = await docClient.send(command);
        console.log(response);
        console.log('SignedUp successfully');
        return response
    } catch (error) {
        console.error('Unable to add item. Error:', JSON.stringify(error, null, 2));
    }
}
//to login
const login = async (email) => {
    const params = {
        TableName: 'users',
        KeyConditionExpression: "email= :email",
        ExpressionAttributeValues: {
            ':email': email
        },
    };
    try {
        const command = new QueryCommand(params);
        const data = await docClient.send(command);
        console.log(command)
        return data
    } catch (error) {
        console.error('Unable to query the table. Error:', JSON.stringify(error, null, 2));
        return [];
    }
}
module.exports = { fetchItems, queryItems, createItem, editItem, deleteItem, signUp, login };