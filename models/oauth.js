'use strict';

var mongoose = require('mongoose');
var modalName = 'oauth';

var schema = new mongoose.Schema({
        userID: String,
        token: String,
        created_at: Date
});

module.exports = mongoose.model(modalName, schema);