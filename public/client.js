let socket = io();

function sendMessage() {
	var x = document.getElementById("inputBox").value;
	document.getElementById("inputBox").value = ''

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


socket.on('newMsg', function(data){
	var chatScreen = document.getElementById("chatScreen");	
	chatScreen.innerHTML += '<div class="chatNode"><p>' + data.message + '<span class="time">' + new Date().toLocaleTimeString() + '</span></p></div>'
});