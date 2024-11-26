// Generisanje korisničkog broja za USER
function generateUserNumber() {
  return `USER-${Math.floor(Math.random() * 10000)}`; // Format: USER-XXXX
}

// Početna boja za korisnika (siva)
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

// Funkcija za slanje poruke sa stilom i bojom
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

module.exports = {
  generateUserNumber,
  getDefaultColor,
  getDefaultStyle,
  formatMessage,
  formatMessageWithColorStyle
};
