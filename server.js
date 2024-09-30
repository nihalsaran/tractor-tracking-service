// server.js
const WebSocket = require('ws');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('WebSocket server is running');
});

const server = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Create WebSocket server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('New client connected');
  
    // Handle incoming messages (location updates from mobile app)
    ws.on('message', (data) => {
      // Convert Buffer to String and then parse it as JSON
      const locationData = JSON.parse(data.toString());
      console.log('Received location:', locationData);
  
      // Broadcast the location to all connected clients (admins)
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(locationData));
        }
      });
    });
  
    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });
  
