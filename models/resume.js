'use strict';

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var modalName = 'resume';

var schema = new mongoose.Schema({
    firstname:{type:String, required:true},
    lastname:{type:String},
    email:{type:String,required:true},
    phone:{type:String,required:true},
    fathername:{type:String,required:true},
    mothername:{type:String,required:true},
    additional_info:{type:String,required:true},
    carrerobjective:{type:String,required:true},
    dateofbirth:{type:Date,required:true},
    birthplace:{type:String},
    nationality:{type:String,required:true},
    sex:{type:String,required:true},
    address:{type:String,required:true},
    specialqualification:{type:String},
    declaration:{type:String,required:true},
    email_notification:{type:Boolean,default:false},
    resume:{type:String,required:true},
    language:[{
        "name":{type:String},
        "rating":{type:Number}
    }],
    education:[{
        name:{type:String,required:true},
        degree:{type:String,required:true},
        period:{
            start:{type:Date},
            end:{type:Date}
        },
        description:{type:String}
    }],
    workhistory:[{
        name:{type:String,required:true},
        designation:{type:String,required:true},
        period:{
            start:{type:Date},
            end:{type:Date}
        },
        description:{type:String}
    }]
    
});


module.exports = mongoose.model(modalName, schema);