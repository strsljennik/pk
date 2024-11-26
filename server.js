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
  const userName = generateUserNumber(); // Generiši korisnički broj
  const userColor = getDefaultColor(); // Podrazumevana boja
  const userStyle = getDefaultStyle(); // Podrazumevani stil

  users[socket.id] = { username: userName, color: userColor, style: userStyle };

  socket.emit('welcome', { userName, userColor, userStyle });
  io.emit('userConnected', userName);

  socket.on('chatMessage', (data) => {
    const user = users[socket.id];
    if (user) {
      const formattedMessage = formatMessageWithColorStyle(user.username, data.message, user.color, user.style);
      io.emit('message', formattedMessage);
    }
  });

  socket.on('disconnect', () => {
    const user = users[socket.id];
    if (user) {
      io.emit('userDisconnected', user.username);
      delete users[socket.id];
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server je pokrenut na portu ${PORT}`);
});
