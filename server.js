var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require('fs');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.get('/:fname', function(req, res) {
		res.render('index', {
			fName: req.params.fname
		});
});
app.get('/img/:fname', function(req, res){
		fs.readFile(req.params.fname, function(err, data) {
				res.writeHead(200, {'Content-Type': 'text/html' });
				res.end(data);
		});
});
var server = app.listen(3000, function() {
		console.log("Express server has started on port 3000");
});

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
secret: '@#@$MYSIGN#@$#$',
			resave: false,
			saveUninitialized: true
			}));

