const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'))

app.get('/', function (request, result) {
	result.sendfile('index.html');
});

var port = process.env.PORT || 3000;

users = [];
//when a user joins this func executes
io.on('connection', function (socket) {
	console.log('A user connected');
	
	socket.on('messageSent', function (data) {
		io.sockets.emit('newMsg', {message: data.message});
	});

	socket.on('disconnect', function() {
		
	});
});

http.listen(port, function (){
	console.log('listening on ' + port);
});
