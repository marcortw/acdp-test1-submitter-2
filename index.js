process.env.TRACE = "acdp-submitter:*"; //acdp-test1-submitter-2

var acdp = require('submitter-nodejs');
var http = require('http');
var httpOutbound = require('./httpconnect');

var server = http.createServer(function (request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello World\n");
});

var localPort = 8002;
var remoteIp = "10.10.80.100";
var remotePort = 8001;
var remoteUrl = 'http://' + remoteIp + ':' + remotePort + '/';

acdp.produce({"tcp": localPort, "for": {"ip": remoteIp}});
server.listen(localPort);
console.log("Server running. ");


acdp.consume({"tcp": remotePort, "ip": remoteIp});
httpOutbound.connect(remoteUrl);