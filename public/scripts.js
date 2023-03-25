const socket = io(`http://localhost:3030/`);

socket.on("receivedMessage", handleMessageReceived);
socket.on("previousMessages", handlePreviousMessagesReceived);

function handleMessageReceived(message) {
  renderMassege(message, false);
}

function handlePreviousMessagesReceived(messages) {
  for (message of messages) {
    renderMassege(message, false);
  }
}

function verifyInputs() {
  const message = document.getElementById("message").value;

  if (!message) {
    document.getElementById("send").disabled = true;
  } else {
    document.getElementById("send").disabled = false;
  }
}

function renderMassege(message, incoming = false) {
  const messagesElement = document.querySelector(".chat-body");
  const newMessageElement = document.createElement("div");
  newMessageElement.classList.add("chat-message");
  newMessageElement.classList.add(incoming ? "outgoing" : "incoming");
  newMessageElement.innerHTML = `
  <div class="chat-message-content">
    <p>${message.message}</p>
    <span class="chat-time">${message.time}</span>
  </div>`;
  messagesElement.appendChild(newMessageElement);
}

function getHoraAtual() {
  const now = new Date();
  const hours = now.getHours() > 12 ? now.getHours() - 12 : now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const period = now.getHours() >= 12 ? "PM" : "AM";

  return `${hours}:${minutes} ${period}`;
}

function sendMensage(event) {
  const message = document.getElementById("message").value;

  if (message) {
    const msgObject = {
      message: message,
      time: getHoraAtual(),
    };

    renderMassege(msgObject, true);
    socket.emit("sendMessage", msgObject);
    document.getElementById("message").value = "";
    verifyInputs();
  }
}
