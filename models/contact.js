var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
facebook_key: String,
contactID: String,
name: String,
phoneNum: String,
email: String
},
{versionKey: false});

module.exports = mongoose.model('contact', contactSchema);
