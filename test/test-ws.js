// test-ws.js
const { io } = require('socket.io-client');

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE4LCJ1c2VybmFtZSI6InRlc3R1c2VyMSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzc4MjM5MjgxLCJleHAiOjE3NzgzMjU2ODF9.FdWEdeGQb1ITa8PrvTd5-C6eKYZhUGZ2uWc3tBzKXgI';

const socket = io('http://localhost:3000/chat', {
  auth: { token: TOKEN },
});

socket.on('connect', () => {
  console.log('✅ Connecté, id:', socket.id);
});

socket.on('history', (messages) => {
  console.log('📜 Historique:', messages);
});

socket.on('user_joined', (data) => {
  console.log('👤 Utilisateur rejoint:', data.username);
});

socket.on('new_message', (msg) => {
  console.log('💬 Nouveau message:', msg);
});

socket.on('message_liked', (data) => {
  console.log('❤️ Like reçu:', data);
});

// Envoyer un message après 1 seconde
setTimeout(() => {
  socket.emit('send_message', { content: 'Bonjour tout le monde !' });
}, 1000);

// Liker le message 1 après 2 secondes
setTimeout(() => {
  socket.emit('like_message', { messageId: 1 });
}, 2000);
