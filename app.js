var http = require('http');
var fs = require('fs');

var socketio = require('socket.io');
var express = require('express');

var app = express();
app.set( 'port', process.env.PORT || 3000 );

var server = http.createServer( function(request, response) {
    fs.readFile('index.html', function (error, data) {
        response.writeHead(200, {'Content-Type': 'text/html' });
        response.end(data);
    });
}).listen(app.get('port'), function () {
        console.log('Server Running at http://172.21.111.44:8080');
});

var io = socketio.listen(server);
io.sockets.on('connection', function (socket) {
    socket.on('message', function (data) {
        io.sockets.emit('message',data);
    });
});