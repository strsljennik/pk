document.addEventListener("DOMContentLoaded", function() {
    const boldBtn = document.getElementById("boldBtn");
    const italicBtn = document.getElementById("italicBtn");
    const colorBtn = document.getElementById("colorBtn");
    const colorPicker = document.getElementById("colorPicker");
    const chatInput = document.getElementById("chatInput");
    const messageArea = document.getElementById("messageArea");
    const usersDiv = document.getElementById("users");
    const nicknameDiv = document.getElementById("nickname");
    const guestDiv = document.getElementById("guest");

    let selectedColor = "#808080"; // Podrazumevana boja
    let isBold = false;
    let isItalic = false;

    // Funkcija za generisanje imena gosta
    function generateGuestName() {
        return "Gost-" + Math.floor(Math.random() * 10000);
    }

    // Funkcija za dodavanje gosta u listu
    function addGuest() {
        const guestName = generateGuestName();
        const guestElement = document.createElement("div");
        guestElement.textContent = guestName;
        guestElement.classList.add("guest"); // Dodajemo CSS klasu
        guestDiv.appendChild(guestElement);
    }

    // Funkcija za primenu boje u unosu poruke
    colorPicker.addEventListener("input", function() {
        selectedColor = colorPicker.value;
        chatInput.style.color = selectedColor; // Postavljamo boju u polje za unos
    });

    // Funkcija za primenu bold i italic stila u unosu poruke
    boldBtn.addEventListener("click", function() {
        isBold = !isBold;
        updateMessageStyle();
    });

    italicBtn.addEventListener("click", function() {
        isItalic = !isItalic;
        updateMessageStyle();
    });

    // Ažuriranje stila poruke u unosu
    function updateMessageStyle() {
        chatInput.style.fontWeight = isBold ? "bold" : "normal";
        chatInput.style.fontStyle = isItalic ? "italic" : "normal";
    }

    // Funkcija za slanje poruke sa odabranim stilovima i bojama
    function sendMessage(message, userName) {
        const messageElement = document.createElement("div");
        messageElement.textContent = `${userName}: ${message}`;
        messageElement.style.color = selectedColor;
        messageElement.style.fontWeight = isBold ? "bold" : "normal";
        messageElement.style.fontStyle = isItalic ? "italic" : "normal";
        messageArea.appendChild(messageElement);
    }

    // Dodavanje korisnika u listu (registrovan korisnik)
    function addUser(username) {
        const userElement = document.createElement("div");
        userElement.textContent = username;
        userElement.classList.add("user"); // Dodajemo CSS klasu
        nicknameDiv.appendChild(userElement);
    }

    // Dodavanje početnog gosta
    addGuest();

    // Primer slanja poruke
    sendMessage("Pozdrav svima!", "Gost-5555");

    // Dodavanje korisnika (primer)
    addUser("RegistrovaniKorisnik");
});
