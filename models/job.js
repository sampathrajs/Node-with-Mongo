'use strict';

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var modalName = 'job';

var schema = new mongoose.Schema({
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'category',required:true},
    company: {type: mongoose.Schema.Types.ObjectId, ref: 'company',required:true},
    designation:{type: mongoose.Schema.Types.ObjectId, ref: 'designation',required:true},
    employment:{
        type:{type: mongoose.Schema.Types.ObjectId, ref: 'emp_type',required:true}
    },
    experience:{
        level:{type: mongoose.Schema.Types.ObjectId, ref: 'exp_level',required:true}
    },
    image:{type:String},
    location:{type: mongoose.Schema.Types.ObjectId, ref: 'location',required:true},
    salary:{
        min:{type:Number,required:true},
        max:{type:Number,required:true},
    },
    state:{type:String},
    posted_on:{type:Date,required:true},
    updated_at:{type:Date}
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model(modalName, schema);