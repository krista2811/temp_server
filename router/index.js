module.exports = function(app, Contact) {
	app.get('/api/contacts/:facebook_key', function(req, res) {
			Contact.find(function(err, data) {
					if (err) {
						return res.status(500).send({error: 'database failure'});
					}
					var arrayStr = '[]';
					var obj = JSON.parse(arrayStr);
					for(var contact in data) {
						if(data[contact].facebook_key == req.params.facebook_key) {
							var base = data[contact];
							delete base.__Z;
							delete base._id;
							obj.push(base);
						}
					}
					res.json(obj);
					/*
					for(var contact: contacts){
						var jsonContact = JSON.parse(contact);
						if(jsonContact.facebook_key == req.params.username) {
							res.json(contact);
						}
					}*/
			});
	});
	app.post('/api/contacts/:facebook_key', function(req, res) {
			for(var reqContact in req.body) {
				var contact = new Contact();
					contact.facebook_key = req.params.facebook_key;
					contact.contactID = req.body[reqContact].contactID;
					contact.name = req.body[reqContact].name;
					contact.phoneNum = req.body[reqContact].phoneNum;
					contact.email = req.body[reqContact].email;
			

				contact.save(function(err) {
						if(err) {
							console.error(err);
							res.json({result: 0});
							return;
						}
				});
			}
			res.json({result: 1});
	});
	
	app.delete('/api/contacts/:facebook_key', function(req, res) {
			Contact.remove({contactID: req.body.contactID},
							{facebook_key: req.params.facebook_key},
							function(err, output) {
								if(err) return res.status(500).json(
										{error: "db failure"})
								res.status(204).end();
			});
	});
};
