document.addEventListener('DOMContentLoaded', function () {
  const socket = io();

  const colorPicker = document.getElementById('colorPicker');
  const colorBtn = document.getElementById('colorBtn');
  const chatInput = document.getElementById('chatInput');
  const messageArea = document.getElementById('messageArea');
  const usersDiv = document.getElementById('users');

  let selectedColor = '#808080'; // Default color
  let guestName = '';

  // Dobrodošlica
  socket.on('welcome', (data) => {
    guestName = data.guestName;
    selectedColor = data.guestColor;
    updateStyles();
    addUserToList(guestName); // Dodavanje gosta u listu
  });

  // Funkcija za ažuriranje stilova
  function updateStyles() {
    chatInput.style.color = selectedColor; // Boja za input
    const userElements = usersDiv.children;
    for (let user of userElements) {
      user.style.color = selectedColor; // Ažuriraj boju svih korisnika
    }
    const messages = messageArea.children;
    for (let message of messages) {
      if (message.dataset.username === guestName) {
        message.style.color = selectedColor; // Ažuriraj boju svih poruka korisnika
      }
    }
  }

  // Dodavanje korisnika u listu sa default bold i italic stilovima
  function addUserToList(username) {
    const userElement = document.createElement('div');
    userElement.textContent = username;
    userElement.style.fontWeight = 'bold'; // Default bold stil
    userElement.style.fontStyle = 'italic'; // Default italic stil
    userElement.style.color = selectedColor;  // Postavljanje boje korisničkog imena
    usersDiv.appendChild(userElement);
  }

  // Otvoriti color picker kada korisnik klikne na dugme
  colorBtn.addEventListener('click', function () {
    colorPicker.click(); // Otvori color picker
  });

  // Promena boje za chat input, poruku i ime korisnika
  colorPicker.addEventListener('input', (e) => {
    selectedColor = e.target.value; // Uzmi novu boju
    updateStyles(); // Ažuriraj boju na svim relevantnim mestima
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
          styles: { bold: true, italic: true }, // Poruka je po defaultu bold i italic
        });
        chatInput.value = '';
      }
    }
  });

  // Prikazivanje poruka sa stilovima
  socket.on('message', (data) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${data.username}: ${data.message}`;
    messageElement.style.color = data.color; // Boja poruke
    messageElement.style.fontWeight = 'bold'; // Default bold stil
    messageElement.style.fontStyle = 'italic'; // Default italic stil
    messageElement.dataset.username = data.username; // Čuvamo username za kasnije ažuriranje
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
