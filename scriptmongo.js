use http_methods
db.scoutPost.remove({"name":"first scout"});
db.scoutPost.find();
db.scoutPost.remove( { type : "" } );
db.scoutPost.remove( { name : { $ne: "vitor" } } );
