'use strict';

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var modalName = 'exp_level';

var schema = new mongoose.Schema({
    name:{type:String,required:true},
    created_at:{type:Date,required:true},
    updated_at:{type:Date}
});


module.exports = mongoose.model(modalName, schema);