// Handles closing and opening expandable menu
function profile() {
    const expandableProfile = document.getElementById("expandableProfile");
    expandableProfile.style.display = (expandableProfile.style.display === "none" || expandableProfile.style.display === "") ? "flex" : "none";
}

document.addEventListener("click", function (e) {
    const expandableProfile = document.getElementById("expandableProfile");

    if (expandableProfile.style.display === "flex" && 
        !expandableProfile.contains(e.target) && 
        !e.target.closest('#profileButton')) {
        expandableProfile.style.display = "none";
    }

});


//// Get the wish list book cards
let cardsBooks

function getWishlist() {
    const userId = getCookieValue('userId');
    console.log(userId)
    fetch("http://localhost:5000/api/mywishlist", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
             'Authorization': `Bearer ${userId}`
        },
    })
        .then(response => {
            if (!response.ok) {
                console.log("Network response was not ok")
            }
            return response.json();
        })
        .then(data => {
            const cardsBooks = data;
            addCardsWishlist(cardsBooks);
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
}

function getCookieValue(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Recuperar el valor de "session_token"

function addCardsWishlist(cardsBooks) {
    let cards = document.getElementById("cards")
    cards.innerHTML = "";
    cardsBooks.forEach(item => {
        cards.innerHTML += `
        <div class="target">
            <div class="img-target">
                <img src="${item.cover_image}"alt=""/>
            </div>
            <div class="main-target">
                <h3>${item.name}</h3>
                <h3>${item.author}</h3>
            </div>
        </div>
    `
    })
}


document.addEventListener("DOMContentLoaded", function () {
    getWishlist()
})

//// Add new dates
function getDatesForm() {
    const bookName = document.getElementById("bookName").value;
    const bookAuthor = document.getElementById("bookAuthor").value;
    const bookimg = document.getElementById("bookimg").value;
    const bookPrice = document.getElementById("bookPrice").value;
    const bookLink = document.getElementById("bookLink").value;
    const userId = getCookieValue('userId');
    const dataObjet = {
        userid: userId,
        bookName: bookName,
        bookAuthor: bookAuthor,
        bookimg: bookimg,
        bookPrice: bookPrice,
        bookLink: bookLink,
    }
    sendDatesForm(dataObjet);
}

function sendDatesForm(dataObjet) {
    fetch("http://localhost:5000/api/mywishlist", {
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