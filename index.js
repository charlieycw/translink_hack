var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// middleware -> if in public server, it will serve it, and then hit next stuff
app.use(express.static('public'));
app.use(bodyParser.json());


//middleware?
// attach stuff to the app
// get on /
app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});

app.post('/bus', function (req, res) {
     
    res.send('POST request to homepage');
});