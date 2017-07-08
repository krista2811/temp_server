var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://localhost/admin", function(err,db){
    var adminDB = db.db("newDB")
    adminDB.createCollection("newCollection", function(err, collection){
        if(!err){
            console.log("New Database and Collection Created");
        }
    });
});
