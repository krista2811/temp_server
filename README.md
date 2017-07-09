#API

GET ('/api/contacts/:facebook_key)  
* require:
* response:
```
[
	{
		"_id": String,
		"email": String,
		"phoneNum": String,
		"name": String,
		"contactID": String,
		"facebook_key": String
	}
	...
]
```

POST ('/api/contacts/:facebook_key)
* require:
```
[
	{
		"contactID": String,
		"name": String,
		"phoneNum": String,
		"email": String,
	}
]
```
* response:
`{return: num}`  
* if error found, num = 0 else, num = 1  
DELETE ('/api/contacts/:facebook_key)
* require:
```
[
	{
		"contactID": String
	}
	...
]
```
* response
'{return: num}`  
*if error found, num = 0 else, num = 1  

PUT ('/api/contacts/:facebook_key)
* require:
```
[
	{
		"contactID": String (necessary)
		"name": String (unnecessary)
		"email": String(unnecessary)
		"phoneNum": String(unnecessary)
	}
]
```
* response:  
`{message: "contact updated"}`
* SHOULD NOT USE DIFFERENT contactID

POST (./api/photo/:facebook_key)
* require:  
form-data  
name: "userfile"  
filename: String  
Content-Type: image/jpeg  
* response: 
'{message: "All done"}`  
*post one file to server.  

GET (./api/photos/:facebook_key)  
* require:
* response:
```
[
	{
		"_id": String,
		"facebook_key": String,
		"photoName": String,
		"photoDir": String,
		"thumbDir": String
	}
	...
]
```  
DELETE (./api/photos/:facebook_key)  
* require:
```
[
	{
		"_id": String
	}
	...
]
```
* response:  
`{"results": 1}`  
