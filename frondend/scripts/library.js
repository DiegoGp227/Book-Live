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


//// Add userName 
function getCookieValue(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return decodeURIComponent(parts.pop().split(';').shift());
    }
}

const userName = getCookieValue("userName");

function getMyBookAccount() {
    const userId = getCookieValue("userId");
    fetch("http://localhost:5000/api/countingdata", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userId}`
        }
    })
        .then(response => {
            if (!response.ok) {
                console.log("Network response was not ok")
            }
            return response.json();
        })
        .then(data => {
            var bookCount = data.bookCount;
            var wishlistCount = data.wishlistCount
            addProfileInfo(bookCount,wishlistCount)
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
};

function addProfileInfo(bookCount,wishlistCount) {
    let divUserNameElements = document.getElementsByClassName("divUserName");
    let userInfo = document.getElementById("userInfo")
    userInfo.innerHTML = "";
    userInfo.innerHTML += `
Ñ        <div id="userInfo">
          <h3>Statistics</h3>
          <p>Total books read: ${bookCount}</p>
          <p>Total books in wishlist: ${wishlistCount}</p>
        </div>
    `
    for (let i = 0; i < divUserNameElements.length; i++) {
        const divUserName = divUserNameElements[i];
        divUserName.innerHTML = `<a href="profile.html">${userName}</a>`;
    }
};

// Restante de tu código
document.addEventListener("DOMContentLoaded", function () {
    getBooks();
    getMyBookAccount();
});
