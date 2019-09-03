'use strict'

const uuid = require('uuid')
const AWS = require("aws-sdk")

let db = new AWS.DynamoDB.DocumentClient()

module.exports.search = (data, callback) => {
}

module.exports.create = (data, callback) => {
    const timestamp = new Date().getTime()

    if (typeof data.email !== 'string') {
        callback(new Error('Email is required.'))
        return
    }

    const params = {
        TableName: process.env.SUBSCRIBERS_TABLE,
        Item: {
            id: uuid.v1(),
            email: data.email,
            activated_at: false,
            createdAt: timestamp,
            updatedAt: timestamp,
        },
    }

    db.put(params, (error) => {
        if (error) {
            callback(new Error('Couldn\'t create the subscriber.'))
            return
        }

        callback(null, params.Item)
    })
}

exports.update = (params, callback) => {
    callback(null, {tableName: process.env.SUBSCRIBERS_TABLE})
}
