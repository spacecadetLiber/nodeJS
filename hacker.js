var request = require('request');
var fs = require("fs");
var buf = new Buffer(1024);




fs.open('output.txt', 'r+', function (err, fd) {
    if (err) {
        return console.error(err);
    }
    fs.read(fd, buf, 0, buf.length, 0, function (err, data) {
        if (err) {
            console.log(err);
        }
        var file = (buf.slice(0, data).toString());
        console.log(file);
        
        request.post(
            'http://127.0.0.1:8081/process_post', {
                json: {
                    fname: 45,
                    surname:70,
                    age:'age',
                    password: 'e',
                    email: 'snap@_()express@gmail.com',
                    phone: 'phone',
                    city: 2,
                    country: 3,
                    postal_code: '1170',
                    picture: file,
                    description:'',
                    countries:''
                    
                    }
            },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body)
                }
            }
        );
    });




});