var express = require('express');
var bodyParser = require('body-parser');
var proxyMiddleware = require('http-proxy-middleware');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var context = '/api';    
var app = express();

//http://api.translink.ca/rttiapi/v1/buses?apikey=9f8qVp2UQtqU4RuU6kgV&routeNo=041
var proxy = proxyMiddleware('/rttiapi', {
        target: 'http://api.translink.ca', // target host 
        changeOrigin: true,               // needed for virtual hosted sites 
        ws: true
    });

// middleware -> if in public server, it will serve it, and then hit next stuff
app.use(express.static('public'));
app.use(proxy);
app.use(bodyParser.json());

//app.use('/api', proxy(url.parse('https://example.com/endpoint')));
// now requests to '/api/x/y/z' are proxied to 'https://example.com/endpoint/x/y/z'


//middleware?
// attach stuff to the app
// get on /
app.get('/', function (req, res) {
  res.send('Hello World!');
});



io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});


app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});

var buses = {};
app.post('/bus', function (req, res) {
    var bus = req.body;
    buses[bus.id] = (buses[bus.id] || 0) + 1;
    res.json(buses);
});


var http = require("http");
var url = "http://api.translink.ca/rttiapi/v1/buses?apikey=9f8qVp2UQtqU4RuU6kgV&routeNo=041";

/*
var request = http.get(url, function(response) {
     var buffer = "", data;
   response.on("data", function(chunk){
       buffer += chunk;
   });
   response.on("end", function (err) {
        // finished transferring data
        // dump the raw data
        console.log(buffer);
        console.log("\n");
    }); 
});

*/

