const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { generateUserNumber, getDefaultColor, getDefaultStyle, formatMessageWithColorStyle } = require('./user');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

const users = {}; // Skladištenje korisnika po socket ID-u

// Konekcija sa klijentom
io.on('connection', (socket) => {
  const userName = generateUserNumber(); // Generiši korisnički broj
  const userColor = getDefaultColor(); // Podrazumevana boja
  const userStyle = getDefaultStyle(); // Podrazumevani stil

  users[socket.id] = { username: userName, color: userColor, style: userStyle };

  // Pošaljemo dobrodošlicu korisniku
  socket.emit('welcome', { userName, userColor, userStyle });
  io.emit('userConnected', userName); // Emituj kada se korisnik poveže

  // Kada korisnik pošalje poruku
  socket.on('chatMessage', (data) => {
    const user = users[socket.id];
    if (user) {
      const formattedMessage = formatMessageWithColorStyle(user.username, data.message, user.color, user.style);
      io.emit('message', formattedMessage); // Emituj poruku svim korisnicima
    }
  });

  // Kada korisnik ode
  socket.on('disconnect', () => {
    const user = users[socket.id];
    if (user) {
      io.emit('userDisconnected', user.username); // Emituj kada korisnik napusti chat
      delete users[socket.id]; // Ukloni korisnika iz liste
    }
  });
});

// Postavljanje servera na port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server je pokrenut na portu ${PORT}`);
});
