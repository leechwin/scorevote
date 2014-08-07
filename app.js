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

var date = null;
var contents = '';
var io = socketio.listen(server);
io.sockets.on('connection', function (socket) {
    socket.on('message', function (data) {
        if ( date == null ) {
            date = data.date;
        } else {
            console.log("host time:" + date);
            console.log("client time: " + data.date);

            var diff = data.date - date;
            console.log("diff time: " + diff);
            if ( diff > 3 ) {
                date = null;
                contents = '';
            }
        }

        // FIXME:: use database
        contents += '<li>';
        contents += '<h3>' + data.score + '</h3>';
        contents += '<p>' + data.message + '</p>';
        // contents += '<p>' + data.location + '</p>';
        // contents += '<p>' + data.date + '</p>';
        contents += '</li><br>';
        io.sockets.emit('message', contents);
    });
});
