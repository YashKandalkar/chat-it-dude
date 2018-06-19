const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function (request, result) {
	result.sendfile('index.html');
});


//when a user joins this func executes
io.on('connection', function (socket) {
	socket.on('clientEvent', function(data) {
		console.log(data)
	});
});

http.listen(5000, function (){
	console.log('listening on *:3000');
});
