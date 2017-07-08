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
			});
	});
	app.post('/api/contacts/:facebook_key', function(req, res) {
			for(var reqContact in req.body) {
				var contact = new Contact();
					/**
					 *after initialization
					 */
					contact.facebook_key = req.params.facebook_key;
					if(req.body[reqContact].contactID != null) {
						contact.contactID = req.body[reqContact].contactID;
					} else {
						contact.contactID = "";
					}
					if(req.body[reqContact].name == null){
						contact.name = "";
					} else {
						contact.name = req.body[reqContact].name;
					}
					if(req.body[reqContact].phoneNum != null) {
					contact.phoneNum = req.body[reqContact].phoneNum;
					} else {
						contact.phoneNum = "";
					}
					if(req.body[reqContact].email != null) {
					contact.email = req.body[reqContact].email;
					} else {
						contact.email = "";
					}

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
			for(var contactID in req.body) {
				Contact.remove({contactID: req.body[contactID].contactID,
						facebook_key: req.params.facebook_key},
							function(err) {
								if(err) {
								return res.status(500).json({error: "db failure"});
								}
				});
			}
			res.json({results: 1});
	});
};
