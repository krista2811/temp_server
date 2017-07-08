modules.exports = function(app, Contact) {
	app.get('/api/contacts', function(req, res) {
			Contact.find(function(err, myGallaxy) {
					if (err) {
						return res.status(500).send({error: 'database failure'});
					}
					res.json(myGallaxy);
			});
	});
};

