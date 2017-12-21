use http_methods
db.http_methods.find().pretty();

db.http_methods.remove( { _id : { $in: [
    ObjectId("592d4077551ec5050c9638fd"),
    ObjectId("592d4077551ec5050c9638fc"),
    ObjectId("592d4077551ec5050c9638fb"),
    ObjectId("592d4077551ec5050c9638fa"),
    ObjectId("592d4077551ec5050c9638f9"),
    ObjectId("592d4077551ec5050c9638f8"),
     ObjectId("592d4077551ec5050c9638f7"),
] } } );


//QUERY
	db.http_methods.find({"field.input.name":"AssertionError"}).pretty();