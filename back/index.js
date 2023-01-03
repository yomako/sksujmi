import { server as WebSocketServer } from 'websocket';
import http from 'http';
import { MongoClient } from 'mongodb';
function dba() {
	const uri = 'mongodb://localhost:27017/?maxPoolSize=20&w=majority';
	const client = new MongoClient(uri);
	return client.db('sksujmi');
	// console.log(client.db('sksujmi'));
}
const db = (col) => {
	const uri = 'mongodb://localhost:27017/?maxPoolSize=20&w=majority';
	const client = new MongoClient(uri);
	console.log('connected to db');
	return client.db('sksujmi').collection(col);
	// console.log(client.db('sksujmi'));
};
const collection = db('conversation');
collection.find().forEach((el) => {
	console.log(el);
});
const student = { name: 'John Smith', age: 30, major: 'Computer Science' };
collection.insertOne(student).then((res) => {
	console.log(res);
});

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
