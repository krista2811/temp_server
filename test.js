
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var formidable = require('formidable');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
		console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/testdb');

var Contact = require('./models/contact');
var Photo = require('./models/photo');
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.get('/:fname', function(req, res) {
		res.render('index', {
			fName: req.params.fname
		});
});
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static('public'));

var port = process.env.PORT || 2048;

var router = require('./router')(app, Contact, Photo);

var server = app.listen(port, function(err) {
		if(err){
			console.error(err);
		}
		console.log("Express server has started on port " + port)
});
