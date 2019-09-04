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

    callback(null, {date: timestamp})
}

exports.update = (params, callback) => {
    callback(null, {tableName: process.env.SUBSCRIBERS_TABLE})
}
