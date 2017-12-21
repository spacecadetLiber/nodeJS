var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http');
var fs = require('fs');
var should = require('chai').should();
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var inputs;
var urlencodedParser = bodyParser.urlencoded({
    extended: false
})

app.use(express.static('public'));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("view options", {
    layout: false
});


function errorHandler(err, req, res, next) {
    console.error(err.message);
    console.error(err.stack);
    res.status(500).render('error_template', {
        error: err
    });
}



MongoClient.connect('mongodb://localhost:27017/http_methods', function (err, db) {

    app.get('/', function (req, res) {
        res.render('index');
    });

    app.get('/about', function (req, res) {

        db.collection('form').find().toArray(function (err, results) {

            res.render('about', {
                fetchMongo: results
            });

        })
    });

    /*app.post('/process_post', urlencodedParser, function (req,res){
        var upload= req.body.picture; //GUARDA O FICHEIRO
        
    db.collection('files').insertOne(
                    { 'name': upload},
                    function (err, r) {
                        assert.equal(null, err);
                        res.send("File inserted with _id: " + r.insertedId);
                    }
                );
         console.log("FILE RECEIVED: " + upload);
    })
     */
    app.post('/process_post', urlencodedParser, function (req, res) {
        var expect = require('chai').expect,


            response = {
                fname: req.body.fname,
                surname: req.body.surname,
                age: req.body.age,
                password: req.body.password,
                email: req.body.email,
                phone: req.body.phone,
                city: req.body.city,
                country: req.body.country,
                postal_code: req.body.postal_code,
                description: req.body.description,
                picture: req.body.picture,
                countries:req.body.countries
            };

        res.end(JSON.stringify(response));


        //CHAI EXPECT TEST

        inputs = [response.fname, response.surname, response.age, response.password, response.email, response.phone, response.city, response.country, response.postal_code, response.description, response.picture, response.countries];

        for (var i in inputs) {
            var stackErrors = {};

            stackErrors = validate(i);

        }


        function validate(i) {


            var fields = inputs[i];

            try {

                if (i == 0) {
                    expect(fields).to.match(/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/);
                    expect(fields).to.have.length.above(1);
                    expect(fields).to.have.length.below(450);
                    //saveFields();
                    }
               

                if (i == 1) {
                    expect(fields).to.match(/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/);
                    expect(fields).to.have.length.above(1);
                    expect(fields).to.have.length.below(450);
                    //console.log("Surname received: " + fields);
                }

                if (i == 2) {
                    expect(fields).not.to.be.NaN;
                    //console.log("Age received: " + fields);
                }

                if (i == 3) {
                    expect(fields).to.match(/^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/);
                    //LINK:https://stackoverflow.com/questions/2370015/regular-expression-for-password-validation
                    //console.log("Password received: " + fields);
                }

                if (i == 4) {
                    expect(fields).to.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
                    expect(fields).to.have.length.below(256);
                    //console.log("Email received: " + fields);
                    //console.log("EMAIL HACK SUCESSFULL " + fields);
                } else {
                    //console.log("EMAIL HACK NOT SUCESSFULL. TRY AGAIN " + fields);

                }

                if (i == 5) {
                    expect(fields).not.to.be.NaN;
                    expect(fields).to.have.length.below(20);
                    //console.log("Phone received: " + fields);
                }

                if (i == 6) {
                    expect(fields).to.match(/^[a-zA-Z]+$/);
                    expect(fields).to.have.length.above(1);
                    expect(fields).to.have.length.below(150);
                    //console.log("City received: " + fields);
                    //console.log("CITY HACK SUCESSFULL " + fields);
                }

                if (i == 7) {
                    expect(fields).to.match(/^[a-zA-Z]+$/);
                    expect(fields).to.have.length.above(1);
                    //console.log("Country received: " + fields);    
                }

                if (i == 8) {
                    expect(fields).to.match(/^(\d+-?)+\d+$/);
                    //console.log("Postal Code received: " + fields);

                    //console.log("POSTAL CODE HACK SUCESSFULL " + fields);
                } else {
                    //console.log("POSTAL HACK NOT SUCESSFULL. TRY AGAIN " + fields);

                }

                if (i == 9) {
                    expect(fields).to.have.length.above(0);
                    expect(fields).to.have.length.below(500);
                    //console.log("Description received: " + fields);
                    //console.log("DESCRIPTION HACK SUCESSFULL " + fields);
                } else {
                    //console.log("DESCRIPTION HACK NOT SUCESSFULL. TRY AGAIN " + fields);

                }

                if (i == 10) {
                    expect(fields).to.have.length.above(0);
                    //console.log("The content of the hacking file is:  " + fields);
                    //console.log("PICTURE FIELD IS " + fields);
                } else {
                    //console.log("PICTURE HACK NOT SUCESSFULL. TRY AGAIN " + fields);

                }
                
                if (i == 11) {
                    expect(fields).to.have.length.above(0);
                    //console.log("The content of the hacking file is:  " + fields);
                    console.log("COUNTRY IS " + fields);
                } else {
                    //console.log("PICTURE HACK NOT SUCESSFULL. TRY AGAIN " + fields);

                }

                return "OK";

            } catch (stackErrors) {
                console.log("THE STACK OBJECT IS " + stackErrors);
                saveToMongo(stackErrors);
                return stackErrors;

            }

        }


        //SAVE ERRORS

        function saveToMongo(stackErrors) {

            //INSERT        
            db.collection('form').insert({
                    "field": {
                        "input": [stackErrors]
                    },
                }),
                function (err, result) {
                    assert.equal(err, null);
                    callback(result);
                };

        }
        
        function saveFields() {

            //INSERT        
          db.collection('fields').insertOne(
                    { 'name': response.fname},
                    function (err, r) {
                        assert.equal(null, err);
                        res.send("File inserted with _id: " + r.insertedId);
                    }
                );
         console.log("FILE RECEIVED: " + response.fname);

        }

    })



    app.use(errorHandler);

    var server = app.listen(8081, function () {
        var port = server.address().port;
        console.log('Express server listening on port %s.', port);
    });

});


