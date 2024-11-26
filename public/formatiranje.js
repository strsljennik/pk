document.addEventListener('DOMContentLoaded', function () {
  const socket = io();

  const boldBtn = document.getElementById('boldBtn');
  const italicBtn = document.getElementById('italicBtn');
  const colorPicker = document.getElementById('colorPicker');
  const colorBtn = document.getElementById('colorBtn');  // Dugme za color picker
  const chatInput = document.getElementById('chatInput');
  const messageArea = document.getElementById('messageArea');
  const usersDiv = document.getElementById('users');

  let isBold = false;
  let isItalic = false;
  let selectedColor = '#808080'; // Default color
  let guestName = '';

  // Dobrodošlica
  socket.on('welcome', (data) => {
    guestName = data.guestName;
    selectedColor = data.guestColor;
    chatInput.style.color = selectedColor;
    addUserToList(guestName);
  });

  // Dodavanje korisnika u listu i postavljanje boje za ime
  function addUserToList(username) {
    const userElement = document.createElement('div');
    userElement.textContent = username;
    userElement.style.fontWeight = isBold ? 'bold' : 'normal'; // Stilizovanje korisničkog imena
    userElement.style.fontStyle = isItalic ? 'italic' : 'normal'; // Stilizovanje korisničkog imena
    userElement.style.color = selectedColor;  // Postavljanje boje korisničkog imena
    usersDiv.appendChild(userElement);
  }

  // Rukovanje bold/italic stilovima
  boldBtn.addEventListener('click', () => {
    isBold = !isBold;
    chatInput.style.fontWeight = isBold ? 'bold' : 'normal';
  });

  italicBtn.addEventListener('click', () => {
    isItalic = !isItalic;
    chatInput.style.fontStyle = isItalic ? 'italic' : 'normal';
  });

  // Otvoriti color picker kada korisnik klikne na dugme
  colorBtn.addEventListener('click', function() {
    colorPicker.click();  // Otvori color picker
  });

  // Promena boje za chat input, poruku i ime korisnika
  colorPicker.addEventListener('input', (e) => {
    selectedColor = e.target.value;  // Uzmi novu boju

    // Postavljanje boje za chat input
    chatInput.style.color = selectedColor;

    // Postavljanje boje za sve nove korisnike u listi
    const users = usersDiv.children;
    for (let user of users) {
      user.style.color = selectedColor;
    }
  });

  // Slanje poruke
  chatInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const message = chatInput.value.trim();
      if (message) {
        socket.emit('chatMessage', {
          username: guestName,
          message,
          color: selectedColor,
          styles: { bold: isBold, italic: isItalic },
        });
        chatInput.value = '';
      }
    }
  });

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

  // Prikazivanje poruka sa stilovima
  socket.on('message', (data) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${data.username}: ${data.message} - ${data.timestamp}`; // Formatiranje sa vremenom
    messageElement.style.color = data.color;  // Boja poruke
    messageElement.style.fontWeight = data.styles.bold ? 'bold' : 'normal';
    messageElement.style.fontStyle = data.styles.italic ? 'italic' : 'normal';
    messageArea.appendChild(messageElement);
  });

  // Upravljanje korisnicima (prikaz novih korisnika i odjavljivanje)
  socket.on('userConnected', (username) => {
    addUserToList(username);
  });

  socket.on('userDisconnected', (username) => {
    const userElements = Array.from(usersDiv.children);
    userElements.forEach((el) => {
      if (el.textContent === username) usersDiv.removeChild(el);
    });
  });
});
