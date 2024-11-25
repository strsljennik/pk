// Uzmi referencu na polje za unos poruke
const chatInput = document.getElementById('chatInput');

// Dodaj događaj za pritisak na ENTER
chatInput.addEventListener('keydown', function(event) {
  // Proveri da li je pritisnut ENTER (kod 13)
  if (event.key === 'Enter') {
    event.preventDefault(); // Sprečava novi red u textarea
    const message = chatInput.value.trim(); // Uzmi unos iz input polja
    
    if (message) {
      // Pozovi funkciju za slanje poruke
      sendMessage(message);
      chatInput.value = ''; // Očisti polje za unos
    }
  }
});

// Funkcija za slanje poruke
function sendMessage(message) {
  // Pretpostavimo da koristimo neki sistem za prikazivanje poruka
  const formattedMessage = formatMessage('User', message); // Prilagodi ime korisnika
  console.log(formattedMessage); // Ispisuje poruku (možeš dodati logiku za prikazivanje na ekranu)
}
