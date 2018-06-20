let socket = io();

function myFunction() {
	var ul = document.getElementById("chat_list");
	var li = document.createElement("li");
	var x = document.getElementById("myText").value;

	//send an event to our server with the message
	socket.emit('messageSent', {message: x})
	li.appendChild(document.createTextNode(x));
	ul.appendChild(li);
}

var online_status = document.getElementById("online_status");

socket.on('broadcast', function(data){
	online_status.innerHTML(data.description);
});

socket.on('newMsg', function(data){
	var ul = document.getElementById("chat_list");
	var li = document.createElement("li");

	li.appendChild(document.createTextNode(data.message));
	ul.appendChild(li);
});