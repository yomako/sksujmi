import { server as WebSocketServer } from "websocket";
import http from "http";
import { MongoClient } from "mongodb";
import { generateHash } from "random-hash";

const db = (col) => {
  const uri = "mongodb://localhost:27017/?maxPoolSize=20&w=majority";
  const client = new MongoClient(uri);
  console.log("connected to db");
  return client.db("sksujmi").collection(col);
};
const collection = db("conversation");
collection.find().forEach((el) => {
  console.log(el);
});
const student = { name: "John Smith", age: 30, major: "Computer Science" };
collection.insertOne(student).then((res) => {
  console.log(res);
});

const server = http.createServer(function (request, response) {
  console.log(new Date() + " Received request for " + request.url);
  response.writeHead(404);
  response.end();
});
server.listen(8080, function () {
  console.log(new Date() + " Server is listening on port 8080");
});
const wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false,
});

wsServer.on("request", (request) => {
  const connection = request.accept();

  connection.on("message", (message) => {
    const messageDecoded = JSON.parse(message.utf8Data);
    // if (!message.utf8Data) {
    //   newUser(request.key, connection);
    //   return;
    // }

    // sendMessage(JSON.parse(message.utf8Data), connection);
    switch (messageDecoded.action) {
      case "new-guest":
        sendMessage(
          {
            ...messageDecoded,
            content: {
              token: generateHash({ length: 20 }),
            },
          },
          connection
        );
        break;
      default:
        sendMessage(
          {
            ...messageDecoded,
            content: {
              code: 404,
              message: "action not found",
            },
          },
          connection
        );
    }
  });

  connection.on("close", () => {
    delete websockets[request.key];
  });
});
let websockets = {};

const newUser = (requestKey, connection) => {
  websockets[requestKey] = connection;
  connection.send(
    JSON.stringify({
      userId: requestKey,
      users: Object.keys(websockets).filter((el) => el !== requestKey),
    })
  );
};
const sendMessage = (messageToSend, connection) => {
  if (!!connection) connection.send(JSON.stringify(messageToSend));
  // if (!!websockets[ID]) websockets[ID].send(JSON.stringify(messageToSend));
};
