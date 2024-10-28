//// Push
let cardsBooks

function getCookieValue(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function getBooks() {
    const userId = getCookieValue('userId');
    console.log(userId)
    fetch("http://localhost:5000/api/mybooks", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
             'Authorization': `Bearer ${userId}`
        },
        // credentials: true
    })
        .then(response => {
            if (!response.ok) {
                console.log("Network response was not ok")
            }
            return response.json();
        })
        .then(data => {
            const cardsBooks = data;
            addCardsBooks(cardsBooks);
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
}

// Recuperar el valor de "session_token"

function addCardsBooks(cardsBooks) {
    let cards = document.getElementById("cards")
    cards.innerHTML = "";
    cardsBooks.forEach(item => {
        cards.innerHTML += `
        <div class="target">
            <div class="img-target">
                <img src="${item.cover_image}"alt=""/>
            </div>
            <div class="main-target">
                <h3>${item.title}</h3>
                <h3>${item.author}</h3>
            </div>
        </div>
    `
    })
}


document.addEventListener("DOMContentLoaded", function () {
    getBooks()
})

//// Add new dates
function getDatesForm() {
    const bookName = document.getElementById("bookName").value;
    const bookAuthor = document.getElementById("bookAuthor").value;
    const bookCalification = document.getElementById("bookCalification").value;
    const bookimg = document.getElementById("bookimg").value;
    const bookCategory = document.getElementById("bookCategory").value;
    const bookDescription = document.getElementById("bookDescription").value;
    const userId = getCookieValue('userId');
    console.log("dghfhgj")
    const dataObjet = {
        userid: userId,
        bookName: bookName,
        bookAuthor: bookAuthor,
        bookCalification: bookCalification,
        bookimg: bookimg,
        bookCategory: bookCategory,
        bookDescription: bookDescription,
    }
    console.log(dataObjet)
    sendDatesForm(dataObjet);
}

function sendDatesForm(dataObjet) {
    fetch("http://localhost:5000/api/mybooks", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataObjet)
    });
}

const sendButtomForm = document.getElementById("sendButtomForm");

sendButtomForm.addEventListener("click", async (event) => {
    getDatesForm(event);
});