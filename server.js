const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { 
  generateGuestNumber, 
  formatMessageWithColorStyle, 
  getDefaultColor, 
  getDefaultStyle 
} = require('./user'); // Import user.js modula

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Postavljamo statički folder za index.html i ostale statičke fajlove
app.use(express.static('public'));

// Skladištenje korisnika u memoriji
const users = {};

io.on('connection', (socket) => {
  const guestName = generateGuestNumber();
  const guestColor = getDefaultColor(); // Default boja
  const guestStyle = getDefaultStyle(); // Default stil (bold, italic)

  // Skladišti podatke o korisniku
  users[socket.id] = { username: guestName, color: guestColor, styles: guestStyle };

  // Emitovanje korisniku dobrodošlice i inicijalnih podataka
  socket.emit('welcome', { guestName, guestColor, guestStyle });

  // Emitovanje svim korisnicima o novom korisniku
  io.emit('userConnected', guestName);

  // Prijem poruka sa stilom i bojom
  socket.on('chatMessage', (data) => {
    const user = users[socket.id]; // Dohvati podatke o korisniku
    if (user) {
      const formattedMessage = formatMessageWithColorStyle(user.username, data.message, user.color, user.styles);
      io.emit('message', formattedMessage); // Emitovanje poruke svim korisnicima
    }
  });

  // Disconnect događaj
  socket.on('disconnect', () => {
    const user = users[socket.id];
    if (user) {
      io.emit('userDisconnected', user.username); // Emitovanje svim korisnicima da se korisnik isključio
      delete users[socket.id]; // Ukloni korisnika iz memorije
      console.log(`${user.username} disconnected`);
    }
  });

  // Opcionalno: Za testiranje
  console.log(`${guestName} connected`);
});

// Pokretanje servera na definisanom portu
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server je pokrenut na portu ${PORT}`);
});
