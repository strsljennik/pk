document.addEventListener('DOMContentLoaded', function () {
  const socket = io();

  const colorPicker = document.getElementById('colorPicker');
  const colorBtn = document.getElementById('colorBtn');
  const chatInput = document.getElementById('chatInput');
  const messageArea = document.getElementById('messageArea');
  const usersDiv = document.getElementById('users');

  let selectedColor = '#808080'; // Default color
  let currentUser = ''; // Trenutni korisnik

  // Dobrodošlica i dodavanje korisnika
  socket.on('welcome', (data) => {
    currentUser = data.guestName;
    selectedColor = data.guestColor;

    // Postavi podrazumevani stil za unos
    chatInput.style.color = selectedColor;
    chatInput.style.fontWeight = 'bold';
    chatInput.style.fontStyle = 'italic';

    // Dodaj korisnika u listu
    addUserToList(currentUser, selectedColor);
  });

  // Dodavanje korisnika u listu
  function addUserToList(username, color) {
    const userElement = document.createElement('div');
    userElement.textContent = username;
    userElement.style.color = color;
    userElement.style.fontWeight = 'bold';
    userElement.style.fontStyle = 'italic';
    usersDiv.appendChild(userElement);
  }

  // Otvaranje color pickera
  colorBtn.addEventListener('click', function () {
    colorPicker.click();
  });

  // Promena boje
  colorPicker.addEventListener('input', (e) => {
    selectedColor = e.target.value;

    // Postavi boju za unos
    chatInput.style.color = selectedColor;

    // Promeni boju trenutnog korisnika u listi
    const userElements = Array.from(usersDiv.children);
    userElements.forEach((user) => {
      if (user.textContent === currentUser) {
        user.style.color = selectedColor;
      }
    });
  });

  // Slanje poruke
  chatInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const message = chatInput.value.trim();
      if (message) {
        socket.emit('chatMessage', {
          username: currentUser,
          message,
          color: selectedColor,
          styles: { bold: true, italic: true },
        });
        chatInput.value = '';
      }
    }
  });

  // Prikaz poruke
  socket.on('message', (data) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${data.username}: ${data.message}`;
    messageElement.style.color = data.color;
    messageElement.style.fontWeight = data.styles.bold ? 'bold' : 'normal';
    messageElement.style.fontStyle = data.styles.italic ? 'italic' : 'normal';
    messageArea.appendChild(messageElement);
  });

  // Dodavanje novog korisnika
  socket.on('userConnected', (username) => {
    addUserToList(username, '#808080'); // Podrazumevana boja
  });

  // Uklanjanje korisnika
  socket.on('userDisconnected', (username) => {
    const userElements = Array.from(usersDiv.children);
    userElements.forEach((el) => {
      if (el.textContent === username) usersDiv.removeChild(el);
    });
  });
});
