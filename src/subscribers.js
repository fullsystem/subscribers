'use strict'

const AWS = require("aws-sdk")
let dynamo = new AWS.DynamoDB.DocumentClient();

console.log()

exports.search = (params, callback) => {
    callback(null, {tableName: process.env.SUBSCRIBERS_TABLE})
};

exports.create = (params, callback) => {
    callback(null, {tableName: process.env.SUBSCRIBERS_TABLE})
};

exports.update = (params, callback) => {
    callback(null, {tableName: process.env.SUBSCRIBERS_TABLE})
};
