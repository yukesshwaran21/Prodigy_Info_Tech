const WebSocket = require('ws');

// Create a new WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

// Log a message when the server is successfully running
console.log('WebSocket server running successfully on port 8080');

// When a new client connects
wss.on('connection', function connection(ws) {
    console.log('A new user connected');

    // When a message is received from the client
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);

        // Broadcast the message to all connected clients, except the sender
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // When the client disconnects
    ws.on('close', () => {
        console.log('User disconnected');
    });
});
