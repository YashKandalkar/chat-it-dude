let socket = io();

function sendMessage() {
	var ul = document.getElementById("chat_list");
	var li = document.createElement("li");
	var x = document.getElementById("myText").value;
	document.getElementById("myText").value = ''

	//send an event to our server with the message
	if(x){
		socket.emit('messageSent', {message: x});
	}
}

function keyCode(event) {
    var code = event.keyCode;
    if (code == 13) { //enter key
        sendMessage();
    }
}


socket.on('update_mem_count', function(data){
	var online_status = document.getElementById("online_status");
	while (online_status.firstChild) {
		online_status.removeChild(online_status.firstChild);
	}			
	online_status.appendChild(document.createTextNode(data.description))
});

socket.on('newMsg', function(data){
	var ul = document.getElementById("chat_list");
	var li = document.createElement("li");

	li.appendChild(document.createTextNode(data.message));
	ul.insertBefore(li, ul.childNodes[0])
});