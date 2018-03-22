'use strict';

var mongoose = require('mongoose');
var modalName = 'user';

var schema = new mongoose.Schema({
	userName: {type:String},
	password: {type:String},
	emailID: {type:String},
	phone: {type:String},
	isactive:{type:Boolean},
	isadmin:{type:Boolean},
	created_at:{type:Date},
	updated_at:{type:Date}	
});


module.exports = mongoose.model(modalName, schema);