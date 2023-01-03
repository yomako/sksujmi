import { server as WebSocketServer } from 'websocket';
import http from 'http';
import { MongoClient } from 'mongodb';
const uri = 'mongodb://localhost:27017/?maxPoolSize=20&w=majority';
// // Create a new MongoClient
const client = new MongoClient(uri);
async function run() {
	try {
		// Connect the client to the server (optional starting in v4.7)
		await client.connect();

		// Establish and verify connection
		const sksujmi = client.db('sksujmi');

		// create collection if doesnt exist
		const student = { name: 'John Smith', age: 30, major: 'Computer Science' };
		const insert = sksujmi.collection('conversation').insertOne(student);
		console.log(insert);
		sksujmi
			.collection('conversation')
			.find()
			.forEach(function (err, res) {
				if (err) {
					console.log(err);
					return;
				}
				console.log('database zajebiste mongodb connected');
				console.log(res);
			});
	} catch (e) {
		console.log(e);
	}
}
run();
// run().catch(console.dir);
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
