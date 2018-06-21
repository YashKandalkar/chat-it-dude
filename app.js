const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function (request, result) {
	result.sendfile('index.html');
});

var clients = 0;
var port = process.env.PORT || 3000;

//when a user joins this func executes
io.on('connection', function (socket) {

	clients++;
	io.sockets.emit('update_mem_count', {description : clients + ' people online!'});

	socket.on('messageSent', function (data) {
		io.sockets.emit('newMsg', {message: data.message});
	});

	socket.on('disconnect', function() {
		clients--;
		io.sockets.emit('update_mem_count', {description : clients + ' people online!'});
	});
});

http.listen(port, function (){
	console.log('listening on ' + port);
});
