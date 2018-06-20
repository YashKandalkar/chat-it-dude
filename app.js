const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function (request, result) {
	result.sendfile('index.html');
});

var clients = 0;

//when a user joins this func executes
io.on('connection', function (socket) {

	clients++;
	socket.emit('broadcast', {description : clients + ' people online!'});

	socket.on('messageSent', function (data) {
		io.sockets.emit('newMsg', {message: data.message});
	});

	socket.on('disconnect', function() {
		clients--;
		socket.emit('broadcast', {description : clients + ' people online!'});
	});
});

http.listen(process.env.PORT || 3000, function (){
	console.log('listening on *:3000');
});
