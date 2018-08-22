let socket = io();

function sendMessage() {
	var x = document.getElementById("message").value;
	document.getElementById("message").value = ''

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
	var messageDiv = document.createElement("div");
    var messageBody = document.getElementById("msg_body");
    
    if (/([^\s])/.test(data.message)) 
    {
        messageDiv.className = "msg";
        messageDiv.appendChild(document.createTextNode(data.message));
        messageBody.appendChild(messageDiv);
        messageBody.scrollTo(0,messageBody.scrollHeight);
    }
});