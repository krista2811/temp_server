var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var photoSchema = new Schema({
facebook_key: String,
photoName: String,
photoDir: String,
thumbDir: String,
},
{versionKey: false});

module.exports = mongoose.model('photo', photoSchema);
