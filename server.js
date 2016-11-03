var express = require('express');
var app = express();
var path = require('path');

app.get('/', function(req,res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.use(express.static('./fonts'));
app.use(express.static('./js'));
app.use(express.static('./css'));

var port = 3004;
var host = 'localhost';

app.listen(port, host, () => {
  console.log(`Server started at http://${host}:${port}/ 🎉`);
});
