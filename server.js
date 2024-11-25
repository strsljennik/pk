// Uvozimo potrebne module
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { getUsers, users } = require('./user'); // Import user.js modula

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

// Povezivanje sa socket-om
io.on('connection', (socket) => {
  console.log('A user connected');

  // Ovde možeš dodati više događaja za socket
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Pokretanje servera na definisanom portu
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server je pokrenut na portu ${PORT}`);
});
