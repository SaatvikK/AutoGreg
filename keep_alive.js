//Bot's webserver
let http = require('http');
let fs = require("fs");
http.createServer(function(req, res) {
  res.write("I'm alive");
  res.end();
}).listen(8080);
