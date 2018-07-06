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
	var span = document.createElement('span');
	span.classList.add('time');
	span.appendChild(document.createTextNode(new Date().toLocaleTimeString()));
	var p = document.createElement("P");
	p.appendChild(document.createTextNode(data.message));
	p.appendChild(span);

	var chatNode = document.createElement("DIV");
	chatNode.classList.add('chatNode');
	chatNode.appendChild(p);
	chatScreen.appendChild(chatNode);
	chatScreen.scrollTop = chatScreen.scrollHeight;
});