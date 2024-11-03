// Get the wish list book cards
let cardsBooks;
let dataCardsGlobal;

function getWishlist() {
    const userId = getCookieValue('userId');
    fetch("http://localhost:5000/api/mywishlist", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userId}`
        },
    })
    .then(response => {
        if (!response.ok) {
            console.log("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        cardsBooks = data;
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

////Add menuInfo
function addCardsWishlist(cardsBooks) {
    let cards = document.getElementById("cards");
    let cardId = 0
    cards.innerHTML = "";
    cardsBooks.forEach((item) => {
        cards.innerHTML += `
        <div class="target" data-cardId="${cardId}">
            <div class="img-target">
                <img src="${item.cover_image}" alt=""/>
            </div>
            <div class="main-target">
                <h3>${item.name}</h3>
                <h3>${item.author}</h3>
            </div>
            <button id="moreInfoButton" class="openMoreInfo" onclick="openMoreInfo(), insertInfo(${cardId});">MORE INFO</button>
        </div>
        `;
        cardId ++;
    });
}


function insertInfo(id) {
    let infoCards = document.getElementById("infoCards");
    infoCards.innerHTML = "";
        infoCards.innerHTML += `
            <div id="infoCardsTittle">
                <h3>${cardsBooks[id].name}</h3>
            </div>
            <div id="mainCards">
                <p>Author: ${cardsBooks[id].author}</p>
                <p>Price: ${cardsBooks[id].price}</p>
                <p>
                    Link:
                    <a href="${cardsBooks[id].link}" target="_blank">${cardsBooks[id].link}</a>
                </p>
            </div>
            <button id="deleteCard">DELETE</button>
        `;

}

//// Add new cards
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
    getWishlist();
    getMyBookAccount();
});
