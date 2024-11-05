// Get the wish list book cards
let cardsBooks;
let dataCardsGlobal;
let selectedCardId = null;
let selectedBookId = null;


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
    let cardId = 0;
    let idBook 
    cards.innerHTML = "";
    cardsBooks.forEach((item) => {
        idBook = item.id
        cards.innerHTML += `
        <div class="target" data-cardId="${cardId}">
            <div class="img-target">
                <img src="${item.cover_image}" alt=""/>
            </div>
            <div class="main-target">
                <h3>${item.name}</h3>
                <h3>${item.author}</h3>
            </div>
            <button id="moreInfoButton" class="openMoreInfo" onclick="openMoreInfo(), insertInfo(${cardId},${idBook});">MORE INFO</button>
        </div>
        `;
        cardId++;
    });
}

function insertInfo(id,idBook) {
    let infoCards = document.getElementById("infoCards");
    selectedCardId = id;
    selectedBookId = idBook;
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
        <a href="${cardsBooks[id].link}" target="_blank"
          >${cardsBooks[id].link}</a
        >
      </p>
    </div>
    <div class="buttonsMoreInfo">
        <button id="deleteButton" onclick="deleteCard(${cardsBooks[id].id})">DELETE</button>
          <button id="editButton" onclick="editActivityButton()">
            <img id="editButtonImg" src="../assets/Svgs/pencil.svg" alt="">
        </button>
    </div>
        `;

}

function deleteCard(id) {
    fetch(`http://localhost:5000/api/mywishlist/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => {
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

sendButtomForm.addEventListener("click", async () => {
    getDatesForm();
});

function getDatesFormEdit(id) { // Recibe `id` como parámetro
    const bookName = document.getElementById("bookNameEdit").value;
    const bookAuthor = document.getElementById("bookAuthorEdit").value;
    const bookimg = document.getElementById("bookimgEdit").value;
    const bookPrice = document.getElementById("bookPriceEdit").value;
    const bookLink = document.getElementById("bookLinkEdit").value;
    const userId = getCookieValue('userId');
    const dataObjetEdit = {
        userid: userId,
        bookName: bookName,
        bookAuthor: bookAuthor,
        bookimg: bookimg,
        bookPrice: bookPrice,
        bookLink: bookLink,
    }
    editCard(id, dataObjetEdit); // Pasa `id` y `dataObjet` a `editCard`
}

//// Edit card
function editCard(id, dataObjetEdit) { // Recibe `id` y `dataObjetEdit` como parámetros
    console.log(dataObjetEdit); 
    fetch(`http://localhost:5000/api/mywishlist/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataObjetEdit)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al actualizar la actividad");
        }
        return response.json();
    })
    .then(data => {
        console.log("Actividad actualizada:", data);
        window.location.reload(); // Recarga la página para ver los cambios
    })
    .catch(error => {
        console.error("Error al intentar actualizar la actividad:", error);
    });
}

const sendButtomEdit = document.getElementById("sendButtomEdit");
sendButtomEdit.addEventListener("click", async () => {
    getDatesFormEdit(selectedBookId); 
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
