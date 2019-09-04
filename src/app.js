'use strict'

const Db = require("./subscribers")
const Subscribers = new Db

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
            case 'POST':
                await Subscribers.write(event.body).then((subscriber) => {
                    response(null, subscriber)
                })
                break

            default:
                response(new Error(`Unsupported method "${event.httpMethod}"`))
        }
    } catch (e) {
        console.error(e);

        response(new Error(e))
    }
};
