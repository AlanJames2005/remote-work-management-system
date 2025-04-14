import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

class SocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
  }

  connect() {
    if (!this.socket) {
      this.socket = io(SOCKET_URL, {
        auth: {
          token: localStorage.getItem('token')
        }
      });

      this.setupListeners();
    }
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  setupListeners() {
    this.socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });

    this.socket.on('timeEntryUpdate', (data) => {
      this.notifyListeners('timeEntry', data);
    });

    this.socket.on('taskUpdate', (data) => {
      this.notifyListeners('task', data);
    });

    this.socket.on('newMessage', (data) => {
      this.notifyListeners('message', data);
    });
  }

  // Subscribe to events
  subscribe(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);
  }

  // Unsubscribe from events
  unsubscribe(event, callback) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).delete(callback);
    }
  }

  // Notify all listeners of an event
  notifyListeners(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => callback(data));
    }
  }

  // Emit events
  emitTimeEntry(data) {
    this.socket.emit('timeEntry', data);
  }

  emitTaskUpdate(data) {
    this.socket.emit('taskUpdate', data);
  }

  emitChatMessage(data) {
    this.socket.emit('chatMessage', data);
  }
}

// Create a singleton instance
const socketService = new SocketService();

export default socketService; 