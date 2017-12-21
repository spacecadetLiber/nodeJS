var http = require('http');
var fs = require('fs');
var opn = require('opn');



const options = {
    host: '127.0.0.1',
    port: '8081',
    protocol: 'http:',
    path: '/',
    method: 'POST',

};

var callback = function (response) {

    var arrayData = [];
    response.on('data', function (data) {
        arrayData += data;

    });

    response.on('end', function () {
        console.log('THE DATA IS ' + arrayData);
        console.log('STATUS IS ' + response.statusCode);
  //      var status=response.statusCode;
        //var exportJson = JSON.stringify(options);


        /*fs.appendFile("output.txt", exportJson, function (err) {
            if (err) {
                return cosnsole.log(err);
            }
        });*/


    });


}

function test() {
    var req = http.request(options, callback);
    var arrayTest = [];
    arrayTest += req;
    console.log(req); //IMPRIME CLIENT REQUEST
    console.log('ARRAY CONTENT IS ' + arrayTest);
    opn('http://127.0.0.1:8081/');
    
    
    var outputRes = ["STATUS CODE IS: ",  req.statusCode, "HTTPVERSION IS: ",req.httpVersion, "METHOD IS: ", req.method, "RAW HEADERS ARE: ",req.rawHeaders,"RAW TRAILERS ARE: ",req.rawTrailers, "TIMEOUT IS: ",req.setTimeout, "STATUS MESSAGE IS: ",req.statusMessage, "TRAILERS ARE: ",req.trailers, "URL IS: ", req.url, "OPTIONS ARE: ", options];
    
    
    require('fs').writeFile('output.json', outputRes, function (err) {
          if (err) {
              console.error('Crap happens');
          }
      });
    
    req.end();
}
test();








/*

    var req = http.request(options, function (res) {
        opn('http://127.0.0.1:8081/');
   /* console.log(JSON.stringify(res.headers));
    console.log("Status code:" + JSON.stringify(res.statusCode));
    console.log("httpVersion:" + JSON.stringify(res.httpVersion));
    console.log("method:" + JSON.stringify(res.method));
    console.log("rawHeaders:" + JSON.stringify(res.rawHeaders));
    console.log("rawTrailers:" + JSON.stringify(res.rawTrailers));
  //  console.log(res.socket);
    console.log("setTimeout:" + JSON.stringify(res.setTimeout));
    console.log("statusMessage:" + JSON.stringify(res.statusMessage));
    console.log("trailers:" + JSON.stringify(res.trailers));
    console.log("url:" + JSON.stringify(res.url));
    //console.log(res);
    console.log("OPTIONS " + JSON.stringify(options));
 
    var outputRes = ["STATUS CODE IS: ",  res.statusCode, "HTTPVERSION IS: ",res.httpVersion, "METHOD IS: ", res.method, "RAW HEADERS ARE: ",res.rawHeaders,"RAW TRAILERS ARE: ",res.rawTrailers, "TIMEOUT IS: ",res.setTimeout, "STATUS MESSAGE IS: ",res.statusMessage, "TRAILERS ARE: ",res.trailers, "URL IS: ", res.url, "OPTIONS ARE: ", options];
            
  
  require('fs').writeFile('output.json', JSON.stringify(outputRes), function (err) {
          if (err) {
              console.error('Crap happens');
          }
      }
  );


    });
    req.end();
*/
