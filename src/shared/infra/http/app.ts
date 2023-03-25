require('dotenv/config');
import express from "express";
import path from "path";

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static(path.join("./public")));
app.set("views", path.join("./public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use("/", (req, res) => {
    res.render("index.html");
});

let message = [];

io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.emit('previousMessages', message)

    socket.on('sendMessage', data => {
        message.push(data);
        socket.broadcast.emit('receivedMessage', data);
    })
});

export { server };