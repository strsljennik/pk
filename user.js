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

// Export funkcija za korišćenje u serveru
module.exports = {
  generateGuestNumber,
  getDefaultColor,
  getDefaultStyle,
  formatMessage,
};
