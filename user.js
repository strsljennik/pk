// Korišćenje modula na klijent strani
const { handleSendMessage } = require('./path/to/your/module');

const chatInput = document.getElementById('chatInput');
let guestName = 'Guest-1234'; // Na primer, ovo se dinamički menja
let selectedColor = '#808080'; // Početna boja
let isBold = false;
let isItalic = false;

// Kad korisnik pritisne Enter
chatInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    const message = chatInput.value.trim();
    if (message) {
      handleSendMessage(socket, guestName, message, selectedColor, { bold: isBold, italic: isItalic });
      chatInput.value = ''; // Očisti input
    }
  }
});
