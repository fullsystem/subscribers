'use strict'

const uuid = require('uuid')
const AWS = require("aws-sdk")

let documentClient = new AWS.DynamoDB.DocumentClient()

module.exports = class DB {
    get(key, value) {
        if (typeof key !== 'string') throw new Error(`key was not string and was ${JSON.stringify(key)}`)
        if (typeof value !== 'string') throw new Error(`value was not string and was ${JSON.stringify(value)}`)

        return new Promise((resolve, reject) => {
            let params = {TableName: process.env.SUBSCRIBERS_TABLE, Key: {[key]: value}}

            documentClient.get(params, function (err, data) {
                if (err) {
                    console.log(`There was an error fetching the data for ${key} ${value} on table ${table}`, err)
                    return reject(err)
                }

                return resolve(data.Item)
            })
        })
    }

    write(data) {
        return new Promise((resolve, reject) => {
            if (!data.email) throw "email is required"

            let timestamp = new Date().getTime()
            let params = {
                TableName: process.env.SUBSCRIBERS_TABLE,
                Item: {id: uuid.v1(), email: data.email, email_verified_at: null, createdAt: timestamp, updatedAt: timestamp}
            }

            documentClient.put(params, function (err, result) {
                if (err) {
                    console.log("Err in WriteForCall writing messages to dynamo:", err)
                    console.log(params)
                    return reject(err)
                }

                console.log('Wrote data to table ', process.env.SUBSCRIBERS_TABLE)

                return resolve({...result.Attributes, ...params.Item})
            })
        })
    }
}