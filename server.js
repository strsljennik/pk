const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { generateGuestNumber, formatMessage, getDefaultColor, getDefaultStyle } = require('./user'); // Import user.js modula

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Postavljamo statički folder za index.html i ostale statičke fajlove
app.use(express.static('public'));

io.on('connection', (socket) => {
  const guestName = generateGuestNumber();  // Generisanje broja gosta
  const guestColor = getDefaultColor();    // Default boja za gosta
  const guestStyle = getDefaultStyle();    // Default stil (bold, italic)

  // Emitovanje korisniku dobrodošlice i inicijalnih podataka
  socket.emit('welcome', { guestName, guestColor, guestStyle });

  // Emitovanje svim korisnicima o novom korisniku
  io.emit('userConnected', guestName);

  // Prijem poruka sa stilom i bojom
  socket.on('chatMessage', (data) => {
    // Formatiramo poruku uzimajući username, poruku, boje i stilove
    const formattedMessage = formatMessage(data.username, data.message, data.color, data.styles);
    io.emit('message', formattedMessage); // Emitovanje poruke svim korisnicima
  });

  // Disconnect događaj
  socket.on('disconnect', () => {
    io.emit('userDisconnected', guestName); // Emitovanje svim korisnicima da se korisnik isključio
    console.log(`${guestName} disconnected`);
  });

  // Opcionalno: Za testiranje
  console.log(`${guestName} connected`);
});

// Pokretanje servera na definisanom portu
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server je pokrenut na portu ${PORT}`);
});
