const socket = io(`http://localhost:3030/`);

socket.on("receivedMessage", function (message) {
  renderMassege(message);
});

socket.on("previousMessages", function (messages) {
  for (message of messages) {
    renderMassege(message);
  }
});

function verifyInputs() {
  const message = document.getElementById("message").value;

  if (!message) {
    document.getElementById("send").disabled = true;
    return;
  }

  document.getElementById("send").disabled = false;
}

function renderMassege(message, incoming = false) {
  const messagesElement = document.querySelector(".chat-body");
  const newMessageElement = document.createElement("div");
  newMessageElement.classList.add("chat-message");
  newMessageElement.classList.add(incoming ? "outgoing" : "incoming");
  newMessageElement.innerHTML = `<div class="chat-message-content">
                <p>${message.message}</p>
                <span class="chat-time">${message.time}</span>
                </div>`;
  messagesElement.appendChild(newMessageElement);
}

function getHoraAtual() {
  const agora = new Date();
  let horas = agora.getHours();
  let minutos = agora.getMinutes().toString().padStart(2, "0");
  let segundos = agora.getSeconds().toString().padStart(2, "0");
  let periodo = "AM";

  if (horas > 12) {
    horas -= 12;
    periodo = "PM";
  }

  horas = horas.toString().padStart(2, "0");

  return `${horas}:${minutos} ${periodo}`;
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
  }
}
