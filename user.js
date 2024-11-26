// Generišemo korisnički broj za gosta u formatu "Gost-XXXX"
function generateUserNumber() {
  return `G-${Math.floor(Math.random() * 10000)}`;
}

// Početna boja za korisnike (siva)
function getDefaultColor() {
  return '#808080'; // Siva boja
}

// Default stil (Bold i Italic)
function getDefaultStyle() {
  return {
    fontWeight: 'bold',
    fontStyle: 'italic',
  };
}

// Formatiranje poruke sa korisničkim imenom, porukom i vremenom
function formatMessageWithColorStyle(username, message, color, styles) {
  const berlinTime = new Date().toLocaleString('en-GB', {
    timeZone: 'Europe/Berlin',
  });

  return {
    message: `${username} - ${message} - ${berlinTime}`,
    color: color,
    styles: styles
  };
}

// Funkcija za prikazivanje poruke u chat prozoru
function displayMessage(username, message, color, styles) {
  const messageArea = document.getElementById('messageArea');
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');
  messageDiv.style.color = color;
  messageDiv.style.fontWeight = styles.fontWeight;
  messageDiv.style.fontStyle = styles.fontStyle;
  messageDiv.textContent = formatMessageWithColorStyle(username, message, color, styles).message;
  messageArea.appendChild(messageDiv);
  messageArea.scrollTop = messageArea.scrollHeight; // Pomeri ka dnu kada se doda nova poruka
}

// Slanje poruke sa Enter
function handleSendMessage(socket, username, message, color, styles) {
  if (message.trim() !== "") {
    const formattedMessage = formatMessageWithColorStyle(username, message, color, styles);
    socket.emit('chatMessage', formattedMessage);
    displayMessage(username, message, color, styles); // Prikazivanje poruke u chat prozoru
  }
};

// Export funkcija za korišćenje u serveru
module.exports = {
  generateUserNumber,
  getDefaultColor,
  getDefaultStyle,
  formatMessageWithColorStyle,
  displayMessage,
  handleSendMessage
};
