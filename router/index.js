module.exports = function(app,Contact, Photo) {
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
	app.put('/api/contacts/:facebook_key', function(req, res) {
			for(var contactID in req.body) {
				Contact.find({contactID: req.body[contactID].contactID,
					facebook_key: req.params.facebook_key},
						function(err, data) {
							console.log(data);
							console.log(data.length);
							if(err || data.length == 0) {
							return res.status(500).json({error: "db failure"});
							}
							var contact = data[0];
							if(req.body[contactID].name){
								contact.name = req.body[contactID].name;
							}
							if(req.body[contactID].phoneNum){
								contact.phoneNum = req.body[contactID].phoneNum;
							}
							if(req.body[contactID].email){
								contact.email = req.body[contactID].email;
							}

							contact.save(function(err) {
									if(err){
										return res.status(500)
										.json({error: "fail tu update"});
								}
							});
							
				});
			}
			return res.json({message: "contact updated"});
	});
	var multer = require('multer');
	var storage = multer.diskStorage({
		destination: function(req, file, cb) {
			cb(null, 'images/')
		},
		filename: function(req, file, cb) {
			cb(null, file.originalname)
		}
	})
	var upload = multer({ storage: storage });
	app.post('/api/photos/:facebook_key', upload.single("userfile"), function(req, res)
			{
				var photo = new Photo();
				photo.photoName = req.file.originalname;
				photo.photoDir = req.file.path;
				photo.thumbDir = req.file.path;
				photo.facebook_key = req.params.facebook_key;
				photo.save(function (err, data) {
					if (err) {
						return res.status(500).send({error: 'database failure'});
					}
			})
			res.json({message:"All done"});
			return;

	});			
	app.get('/api/photos/:facebook_key', function(req, res) {
		Photo.find({facebook_key: req.params.facebook_key}, function(err, data) {
				if(err){
					return res.status(500).json({error: "db failure" });
				}
				var arrayStr = '[]';
				var obj = JSON.parse(arrayStr);
				for(var photo in data) {
					obj.push(data[photo]);
				}
				res.json(obj);
		});
	});
	app.delete('/api/photos/:facebook_key', function(req, res) {
			var fs = require('fs');
			for(var photoID in req.body) {
				Photo.find({_id: req.body[photoID]._id,
						facebook_key: req.params.facebook_key},
						function(err, data) {
						if(err){ 
							return res.status(500).json({error: "db failure"});
							}
						for(var photo in data) {
							fs.unlink(__dir + "/" +data[photo].photoDir);
							fs.unlink(__dir + "/" + data[photo].thumbDir);
						}
				});
				Photo.remove({_id: req.body[photoID]._id,
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
