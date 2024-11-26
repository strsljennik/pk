document.addEventListener('DOMContentLoaded', function () {
  const socket = io();

  const boldBtn = document.getElementById('boldBtn');
  const italicBtn = document.getElementById('italicBtn');
  const colorPicker = document.getElementById('colorPicker');
  const chatInput = document.getElementById('chatInput');
  const messageArea = document.getElementById('messageArea');

  let selectedColor = '#808080';
  let isBold = false;
  let isItalic = false;

  // Postavljanje početnih vrednosti
  socket.on('welcome', ({ guestName, color }) => {
    selectedColor = color;
    console.log(`Dobrodošao, ${guestName}!`);
  });

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
        socket.emit('chatMessage', message);
        chatInput.value = '';
      }
    }
  });

  // Prikaz poruka
  socket.on('message', (formattedMessage) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = formattedMessage;
    messageArea.appendChild(messageElement);
  });
});
