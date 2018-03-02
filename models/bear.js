//bear.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
* Define the schema with Bear name and price
*/
var BearSchema = new Schema ({
	name: String,
	price: String
});

module.exports = mongoose.model('Bear', BearSchema)