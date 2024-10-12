const { DynamoDBClient, ScanCommand } = require( "@aws-sdk/client-dynamodb")

const Table = 'todos';

const client = new DynamoDBClient({region: "us-east-1"}); // Specify your AWS region


const fetchItems = async () => {
    const params = {
        TableName: Table// Your DynamoDB table name
    };

    try {
        const command = new ScanCommand(params);
        const data = await client.send(command);
        return data.Items; // Return the items fetched from the table
    } catch (error) {
        console.error('Unable to scan the table. Error:', JSON.stringify(error, null, 2));
        return [];
    }
};

module.exports= fetchItems;



