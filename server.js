// Uvozimo potrebne module
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

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

// Pokrećemo server na portu 3000
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
