/**
 * Created by giautm on 07/08/2016.
 */
'use strict';

const express = require('express');
const jwt = require('express-jwt');
const mongodb = require('mongodb');
const validate = require('validate.js');
const config = require('./config');

const MongoClient = mongodb.MongoClient;
MongoClient.connect(config.connection, function (err, db) {
    if (err) {
        throw err;
    }

    const collection = db.collection('mammals');

    const server = express();
    server.use(jwt(config.jwt));

    collection.find().toArray(function (err, result) {
        if (err) {
            throw err;
        }
        console.log(result);
    });

    server.listen(config.serverPort, function () {
        console.log(`Example app listening on port ${config.serverPort}!`);
    });
});