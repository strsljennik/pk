// Generišemo korisnički broj za gosta
function generateGuestNumber() {
  return `Gost-${Math.floor(Math.random() * 10000)}`;
}

// Početna boja za goste (siva)
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

// Formatiranje poruke: user-poruka-berlin time
function formatMessage(username, message) {
  const berlinTime = new Date().toLocaleString('en-GB', {
    timeZone: 'Europe/Berlin',
  });
  return `${username} - ${message} - ${berlinTime}`;
}

// Emitovanje poruke sa stilom i bojom
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

// Funkcija za promenu boje korisničkog imena i poruka
function changeUserColor(userId, color) {
  // Update korisničkog imena u listi
  const userElement = document.getElementById(userId);
  if (userElement) {
    userElement.style.color = color;
  }

  // Takođe promeniti boju korisničkog imena u porukama
  const messages = document.querySelectorAll(`.message[data-user="${userId}"]`);
  messages.forEach(message => {
    message.style.color = color;
  });

  // Update boje na inputu za unos poruke
  const inputField = document.getElementById('chatInput');
  inputField.style.color = color;
}

// Slanje poruke sa Enter
function handleSendMessage(socket, username, message, color, styles) {
  const formattedMessage = formatMessageWithColorStyle(username, message, color, styles);
  socket.emit('chatMessage', formattedMessage);
}

// Export funkcija za korišćenje u serveru
module.exports = {
  generateGuestNumber,
  getDefaultColor,
  getDefaultStyle,
  formatMessage,
  formatMessageWithColorStyle,
  changeUserColor,
  handleSendMessage
};
