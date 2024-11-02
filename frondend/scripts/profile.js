function getCookieValue(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

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
}


function getCookieValue(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return decodeURIComponent(parts.pop().split(';').shift());
    }
}
const userName = getCookieValue("userName");
const userEmail = getCookieValue("userEmail");

/// fata bucle apra sumar libros y lsita de deseos
function addProfileInfo(bookCount,wishlistCount) {
    let divUserNameElements = document.getElementsByClassName("divUserName");
    let mainTwo = document.getElementById("mainTwo")
    mainTwo.innerHTML = "";
    mainTwo.innerHTML += `
        <h2>${userName}</h2>
        <div id="userInfo">
          <h3>Statistics</h3>
          <p>Total books read: ${bookCount}</p>
          <p>Total books in wishlist: ${wishlistCount}</p>
          <h3>Email</h3>
          <p>${userEmail}</p>
        </div>
    `
    for (let i = 0; i < divUserNameElements.length; i++) {
        const divUserName = divUserNameElements[i];
        divUserName.innerHTML = `<a href="profile.html">${userName}</a>`;
    }
};

document.addEventListener("DOMContentLoaded", function () {
    getMyBookAccount();
})