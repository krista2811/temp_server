# temp_server

# API
GET (/api/contacts/:facebook_key)\n
		request: none\n
		recieve:\n
			``[\n
				{\n
					"_id": String,\n
					"name": String,\n
					"contactID": String,\n
					"phoneNum": String,\n
					"email": String,\n
					"facebook_key": String\n
				},\n
				...\n
			]``\n
		페이스북 키를 받아서 해당하는 contact를 전부 리턴한다.\n
	
POST (/api/contacts/:facebook_key)\n
		request:\n
				``[\n
					{\n
						"contactID": String,\n
						"phoneNum": String,\n
						"email": String,\n
						"name": String\n
					}\n
					...\n
				]``\n
		recieve:\n
			`{result: int}`\n
		페이스북 키와 contact list를 받아서 database에 저장한다.\n
		실패할 경우 0을 출력한다.\n
