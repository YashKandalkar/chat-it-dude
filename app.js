const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function (request, result) {
	result.sendfile('index.html');
});


//when a user joins this func executes
io.on('connection', function (socket) {
	console.log('A user connected');
	socket.emit("connectionEvent", {description : 'new user joined'});
	socket.on('disconnection', function() {
		console.log("A user disconnected")
	});
});

http.listen(process.env.PORT || 3000, function (){
	console.log('listening on *:3000');
});
