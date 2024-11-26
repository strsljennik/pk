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

// Funkcija za prikazivanje poruka u 'messageArea'
function displayMessage(username, message, color, styles) {
  const messageArea = document.getElementById('messageArea');
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');
  messageDiv.style.color = color;
  messageDiv.style.fontWeight = styles.fontWeight;
  messageDiv.style.fontStyle = styles.fontStyle;
  messageDiv.textContent = formatMessage(username, message);
  messageArea.appendChild(messageDiv);
  messageArea.scrollTop = messageArea.scrollHeight; // Pomeri ka dnu kada se doda nova poruka
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
  if (message.trim() !== "") {
    const formattedMessage = formatMessageWithColorStyle(username, message, color, styles);
    socket.emit('chatMessage', formattedMessage);
    displayMessage(username, message, color, styles); // Prikazivanje poruke u chat prozoru
  }
}

// Povezivanje događaja za unos poruke
document.getElementById('chatInput').addEventListener('keydown', function(event) {
  const socket = {}; // Zamenite sa vašim socket objektom
  const username = 'User'; // Zamenite sa stvarnim korisničkim imenom
  const message = event.target.value;
  const color = getDefaultColor();
  const styles = getDefaultStyle();

  if (event.key === 'Enter') {
    handleSendMessage(socket, username, message, color, styles);
    event.target.value = ''; // Očistiti input nakon slanja
  }
});

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
