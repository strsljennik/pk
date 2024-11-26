// Uvozimo potrebne module
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const {
  generateGuestNumber,
  getDefaultColor,
  getDefaultStyle,
  formatMessage,
} = require('./user'); // Import user.js modula

// Kreiramo aplikaciju
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Postavljamo statički folder za index.html i ostale statičke fajlove
app.use(express.static('public'));

// Koristimo rutu za osnovnu stranicu (index.html)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Socket.io događaji
io.on('connection', (socket) => {
  console.log('Novi korisnik se povezao.');

  // Dodeli gosta korisniku
  const guestName = generateGuestNumber();
  socket.emit('welcome', { guestName, color: getDefaultColor() });

  // Rukovanje porukama
  socket.on('chatMessage', (msg) => {
    const formattedMsg = formatMessage(guestName, msg);
    io.emit('message', formattedMsg);
  });

  socket.on('disconnect', () => {
    console.log(`${guestName} se odjavio.`);
  });
});

// Pokretanje servera na definisanom portu
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server je pokrenut na portu ${PORT}`);
});
