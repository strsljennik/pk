// Generišemo korisnički broj za gosta
function generateGuestNumber() {
  const guestNumber = Math.floor(Math.random() * 10000); // Generiše broj do 9999
  return `Gost-${guestNumber}`;
}

// Početna boja za goste (siva)
function getDefaultColor() {
  return '#808080'; // Siva boja
}

// Default stil (Bold i Italic)
function getDefaultStyle() {
  return {
    fontWeight: 'bold',
    fontStyle: 'italic'
  };
}

// Formatiranje poruke: user-poruka-berlin time
function formatMessage(username, message) {
  const berlinTime = new Date().toLocaleString('en-GB', { timeZone: 'Europe/Berlin' });
  return `${username} - ${message} - ${berlinTime}`;
}

// Funkcija za promenu boje korisnika
function changeUserColor(userId, color) {
  // Update korisnika boje na userlisti
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

// Export funkcija za korišćenje u serveru
module.exports = {
  generateGuestNumber,
  getDefaultColor,
  getDefaultStyle,
  formatMessage,
  changeUserColor
};
