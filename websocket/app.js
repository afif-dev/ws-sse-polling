const express = require("express");
const ws = require("ws");
const app = express();
const port = 3000;
const wss = new ws.WebSocketServer({ noServer: true });

app.use(express.static("public"));

app.set("view engine", "ejs");

wss.on("connection", function connection(ws) {
  ws.on("message", function message(data, isBinary) {
    // console.log("received: %s", data);
    wss.clients.forEach(function each(client) {
      if (client.readyState === ws.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});

app.get("/", (req, res) => {
  res.render("index", { title: "WebSocket example" });
});

const server = app.listen(port);
server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (socket) => {
    wss.emit("connection", socket, request);
  });
});
