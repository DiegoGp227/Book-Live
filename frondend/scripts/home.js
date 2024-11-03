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

document.addEventListener("DOMContentLoaded", function () {
    getMyBookAccount();
});