const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { generateUserNumber, formatMessageWithColorStyle, getDefaultColor, getDefaultStyle } = require('./user');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

const users = {}; // Skladištenje korisnika po socket ID-u

io.on('connection', (socket) => {
  const user = generateUserNumber(); // Generiši korisnički broj
  const userColor = getDefaultColor(); // Podrazumevana boja
  const userStyle = getDefaultStyle(); // Podrazumevani stil

  users[socket.id] = { users: user, color: userColor, style: userStyle };

  socket.emit('welcome', { user, userColor, userStyle });
  io.emit('userConnected', user);

  socket.on('chatMessage', (data) => {
    const currentUser = users[socket.id];
    if (currentUser) {
      const formattedMessage = formatMessageWithColorStyle(currentUser.user, data.message, currentUser.color, currentUser.style);
      io.emit('message', formattedMessage);
    }
  });

  socket.on('disconnect', () => {
    const currentUser = users[socket.id];
    if (currentUser) {
      io.emit('userDisconnected', currentUser.username);
      delete users[socket.id];
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server je pokrenut na portu ${PORT}`);
});
