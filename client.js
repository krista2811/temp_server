
var http = require("http");

var options = {
	  "method": "POST",
	    "hostname": "13.124.41.33",
		  "port": "2048",
		    "path": "/api/photo/Alice",
			  "headers": {
				      "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
					      "cache-control": "no-cache",
						      "postman-token": "db514ed8-7488-ba42-0393-4279e2f62021"
								    }
};

var req = http.request(options, function (res) {
		  var chunks = [];

		    res.on("data", function (chunk) {
					    chunks.push(chunk);
						  });

			  res.on("end", function () {
					      var body = Buffer.concat(chunks);
						      console.log(body.toString());
							    });
			  });

req.write("------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"userfile\"\r\n\r\n\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--");
req.end();
