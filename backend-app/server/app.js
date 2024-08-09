const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const itemRoutes = require('./routes/items');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
require('dotenv').config();
const { WebSocketServer } = require('ws');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Use this if you need to parse URL-encoded bodies
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
const uri = process.env.MONGO_URI;
if (!uri) {
  console.error("MongoDB URI not found. Please check your environment variables.");
  process.exit(1); // Exit the process if MongoDB URI is not provided
}
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB successfully!');
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit the process if MongoDB connection fails
});

// Routes
app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);


// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const wss = new WebSocketServer({ server });

const connections = {};

wss.on('connection', (ws, req) => {
  // Extract ownerId from URL
  const urlParts = req.url.split('/');
  const ownerId = urlParts[urlParts.length - 1];

  // Store the WebSocket connection based on ownerId
  connections[ownerId] = ws;

  console.log('New client connected:', ownerId);

  ws.on('message', (message) => {
    console.log(`Received message from ${ownerId}:`, message);
    
    // Broadcast the message to the corresponding owner/customer
    const recipient = ownerId === 'owner' ? 'customer' : 'owner';
    const recipientWs = connections[recipient];
    if (recipientWs) {
      recipientWs.send(message);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected:', ownerId);
    // Remove the WebSocket connection when client disconnects
    delete connections[ownerId];
  });
});
// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down server gracefully...');
  server.close(() => {
    console.log('Server has been shut down.');
    process.exit(0);
  });
});
