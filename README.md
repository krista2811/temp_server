# temp_server

# API
GET (/api/contacts/:facebook_key)
		request: none
		recieve:
			`[
				{
					"_id": String,
					"name": String,
					"contactID": String,
					"phoneNum": String,
					"email": String,
					"facebook_key": String
				},
				...
			]`
		페이스북 키를 받아서 해당하는 contact를 전부 리턴한다.
	
POST (/api/contacts/:facebook_key)
		request:
				`[
					{
						"contactID": String,
						"phoneNum": String,
						"email": String,
						"name": String
					}
					...
				]`
		recieve:
			`{result: int}`
		페이스북 키와 contact list를 받아서 database에 저장한다.
		실패할 경우 0을 출력한다.
