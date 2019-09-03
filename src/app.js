'use strict'

const subscribers = require("./subscribers")

exports.lambdaHandler = async (event, context, callback) => {
    const response = (err, response) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? JSON.stringify({error: err.message, stack: err.stack.split("\n")}) : JSON.stringify(response),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    try {
        event.body = JSON.parse(event.body)

        switch (event.httpMethod) {
            case 'DELETE':
                event.body.activated_at = null

                await subscribers.update(event.body, response)
                break;
            case 'GET':
                await subscribers.search(event.body, response)
                break;
            case 'POST':
                await subscribers.create(event.body, response)
                break;
            case 'PUT':
                await subscribers.update(event.body, response)
                break;
            default:
                response(new Error(`Unsupported method "${event.httpMethod}"`))
        }
    } catch (e) {
        console.error(e);

        response(new Error(e))
    }
};
