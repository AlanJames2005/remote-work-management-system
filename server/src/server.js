import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';

// Import routes
import authRoutes from './routes/auth.js';
import timeEntriesRoutes from './routes/timeEntries.js';
import tasksRoutes from './routes/tasks.js';
import teamsRoutes from './routes/teams.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? 'https://your-production-domain.com' 
      : 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  // Handle real-time updates
  socket.on('timeEntry', (data) => {
    io.emit('timeEntryUpdate', data);
  });

  socket.on('taskUpdate', (data) => {
    io.emit('taskUpdate', data);
  });

  socket.on('chatMessage', (data) => {
    io.emit('newMessage', data);
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/time-entries', timeEntriesRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/teams', teamsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 