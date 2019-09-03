'use strict'

const subscribers = require("./subscribers")

exports.lambdaHandler = async (event, context, callback) => {
    const response = (err, response) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? JSON.stringify({error: err.message}) : JSON.stringify(response),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    try {
        switch (event.httpMethod) {
            case 'GET':
                await subscribers.search(JSON.parse(event.body), response)
                break;
            case 'POST':
                await subscribers.create(JSON.parse(event.body), response)
                break;
            case 'PUT':
                await subscribers.update(JSON.parse(event.body), response)
                break;
            default:
                response(new Error(`Unsupported method "${event.httpMethod}"`))
        }
    } catch (error) {
        console.log(error)
        response(new Error(error))
    }
};
