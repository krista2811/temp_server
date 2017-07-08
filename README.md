#API

GET ('/api/contacts/:facebook_key)  
* require:
* recieve:  
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
* recieve:  
`{return: num}`  

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
* recieve:  
'{return: num}`



