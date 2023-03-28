require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const WebSocket = require("ws");
const http = require("http");
const qs = require("querystring");

const app = require("./app");

const server = http.createServer(app);

const websocket = new WebSocket.Server({ server, path: "/websocket" });

websocket.on("connection", (ws, request) => {
  const [_path, params] = request?.url?.split("?");
  const queryParams = qs.parse(params);
  console.log(queryParams);
  console.log("conenected websocket");

  //   send message
  ws.on("message", (message) => {
    const parsedMessage = JSON.parse(message.toString());
    console.log(parsedMessage);
  });
});

server.listen(process.env.PORT || 8999, () => {
  console.log(`server running on port ${server.address().port}`);
});
