import { server as WebSocketServer } from 'websocket';
import http from 'http';

const server = http.createServer(function (request, response) {
	console.log(new Date() + ' Received request for ' + request.url);
	response.writeHead(404);
	response.end();
});
server.listen(8080, function () {
	console.log(new Date() + ' Server is listening on port 8080');
});
const wsServer = new WebSocketServer({
	httpServer: server,
	autoAcceptConnections: false,
});

wsServer.on('request', (request) => {
	const connection = request.accept();

	connection.on('message', (message) => {
		if (!message.utf8Data) {
			newUser(request.key, connection);
			return;
		}
		sendMessage(JSON.parse(message.utf8Data), connection);
	});

	connection.on('close', () => {
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
const sendMessage = ({ message, messangerId }, connection) => {
	connection.send(JSON.stringify({ message }));
	websockets[messangerId].send(JSON.stringify({ message: message }));
};
