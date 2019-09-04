'use strict'

const uuid = require('uuid')
const AWS = require("aws-sdk")

let db = new AWS.DynamoDB.DocumentClient()

module.exports.search = (data, callback) => {
}

module.exports.create = (data, callback) => {
    const timestamp = new Date().getTime()

    callback(null, {date: timestamp})
}

exports.update = (params, callback) => {
    callback(null, {tableName: process.env.SUBSCRIBERS_TABLE})
}
