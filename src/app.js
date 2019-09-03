'use strict'

exports.lambdaHandler = async (event, context, callback) => {
    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    switch (event.httpMethod) {
        case 'DELETE':
            // dynamo.deleteItem(JSON.parse(event.body), done)
            return done(null, JSON.parse(event.body))
            break;
        case 'GET':
            // dynamo.scan({ TableName: event.queryStringParameters.TableName }, done)
            return done(null, JSON.parse(event.body))
            break;
        case 'POST':
            // dynamo.putItem(JSON.parse(event.body), done)
            return done(null, JSON.parse(event.body))
            break;
        case 'PUT':
            // dynamo.updateItem(JSON.parse(event.body), done)
            return done(null, JSON.parse(event.body))
            break;
        default:
            return done(new Error(`Unsupported method "${event.httpMethod}"`))
    }
}
