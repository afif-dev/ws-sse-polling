let socket = new WebSocket("ws://localhost:3000");

// send message from the form
document.forms.publish.onsubmit = function () {
  let outgoingMessage = this.message.value;
  if (outgoingMessage != "") {
    socket.send(outgoingMessage);
  }
  return false;
};

// handle incoming messages
socket.onmessage = function (event) {
  let incomingMessage = event.data;
  showMessage(incomingMessage);
};

// show message in div#messages
function showMessage(message) {
  let messageElem = document.createElement("div");
  messageElem.textContent = message;
  document.getElementById("messages").prepend(messageElem);
}
