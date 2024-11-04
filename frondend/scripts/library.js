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
            cardsBooks = data;
            addCardsBooks(cardsBooks);
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
}

// Recuperar el valor de "session_token"

function addCardsBooks(cardsBooks) {
    let cards = document.getElementById("cards")
    let cardId = 0;
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
            <button id="moreInfoButton" class="openMoreInfo" onclick="openMoreInfo(), insertInfo(${cardId});">MORE INFO</button>
        </div>
    `
        cardId++;
    })
}

function insertInfo(id) {
    let infoCards = document.getElementById("infoCards");
    infoCards.innerHTML = "";
    infoCards.innerHTML += `
        <div id="infoCardsTittle">
            <h3>${cardsBooks[id].title}</h3>
        </div>
        <div id="mainCards">
            <p>Author: ${cardsBooks[id].author}</p>
            <p>Calification: ${cardsBooks[id].rating}</p>
            <p>category: ${cardsBooks[id].category}</p>
            <p>description: ${cardsBooks[id].description}</p>
        </div>
        <div class="buttonsMoreInfo">
            <button id="deleteButton" onclick="deleteCard(${cardsBooks[id].id})">DELETE</button>
            <button id="editButton">
                <img id="editButtonImg" src="../assets/Svgs/pencil.svg" alt="">
            </button>
        </div>
        `;
}

function deleteCard(id) {
    fetch (`http://localhost:5000/api/mybooks/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
    })  .then(response => {
        if (!response.ok) {
            throw new Error("Error al eliminar la actividad");
        }
        return response.json();
    })
    .then(data => {
        console.log("Actividad eliminada:", data); 
        window.location.reload()      
    })
    .catch(error => {
        console.error("Error al intentar eliminar la actividad:", error);
    });
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
            addProfileInfo(bookCount, wishlistCount)
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
};

function addProfileInfo(bookCount, wishlistCount) {
    let divUserNameElements = document.getElementsByClassName("divUserName");
    let userInfo = document.getElementById("userInfo")
    userInfo.innerHTML = "";
    userInfo.innerHTML += `
        <div id="userInfo">
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

function logout() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "userEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    window.location.href = "../pages/login.html";
}

// Restante de tu código
document.addEventListener("DOMContentLoaded", function () {
    getBooks();
    getMyBookAccount();
});
