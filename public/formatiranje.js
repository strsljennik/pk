document.addEventListener('DOMContentLoaded', function () {
  const socket = io();

  const boldBtn = document.getElementById('boldBtn');
  const italicBtn = document.getElementById('italicBtn');
  const colorPicker = document.getElementById('colorPicker');
  const chatInput = document.getElementById('chatInput');
  const messageArea = document.getElementById('messageArea');
  const usersDiv = document.getElementById('users');

  let isBold = false;
  let isItalic = false;
  let selectedColor = '#808080';
  let guestName = '';

  // Dobrodošlica
  socket.on('welcome', (data) => {
    guestName = data.guestName;
    selectedColor = data.guestColor;
    chatInput.style.color = selectedColor;
    addUserToList(guestName);
  });

  // Dodavanje korisnika u listu
  function addUserToList(username) {
    const userElement = document.createElement('div');
    userElement.textContent = username;
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

  // Promena boje
  colorPicker.addEventListener('input', (e) => {
    selectedColor = e.target.value;
    chatInput.style.color = selectedColor;
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

  // Prikazivanje poruka
  socket.on('message', (data) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${data.username}: ${data.message}`;
    messageElement.style.color = data.color;
    messageElement.style.fontWeight = data.styles.bold ? 'bold' : 'normal';
    messageElement.style.fontStyle = data.styles.italic ? 'italic' : 'normal';
    messageArea.appendChild(messageElement);
  });

  // Upravljanje korisnicima
  socket.on('userConnected', (username) => addUserToList(username));
  socket.on('userDisconnected', (username) => {
    const userElements = Array.from(usersDiv.children);
    userElements.forEach((el) => {
      if (el.textContent === username) usersDiv.removeChild(el);
    });
  });
});
