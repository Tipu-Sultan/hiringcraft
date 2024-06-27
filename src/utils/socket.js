
// services/socket.js
import io from 'socket.io-client';

const socket = io('http://localhost:8080'); // Replace with your backend server URL

export const joinRoom = (room) => {
  socket.emit('join', room);
};

export const leaveRoom = (room) => {
  socket.emit('leave', room);
};

export const sendMessage = (message) => {
  socket.emit('sendMessage', message);
};

export const receiveMessage = (callback) => {
  socket.on('message', callback);
};

export default socket;