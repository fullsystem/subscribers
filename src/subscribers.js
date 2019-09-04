'use strict'

const uuid = require('uuid')
const AWS = require("aws-sdk")

let db = new AWS.DynamoDB.DocumentClient()

module.exports.search = (data, callback) => {
}

module.exports.create = (data, callback) => {
    const timestamp = new Date().getTime()

    if (typeof data.email !== 'string') {
        throw new Error('Email is required.')
    }

    let params = {
        TableName: process.env.SUBSCRIBERS_TABLE,
        Item: {
            id: uuid.v1(),
            email: data.email,
            activated_at: false,
            createdAt: timestamp,
            updatedAt: timestamp,
        },
    };

    callback(null, {data: params})
}

exports.update = (params, callback) => {
    callback(null, {tableName: process.env.SUBSCRIBERS_TABLE})
}
