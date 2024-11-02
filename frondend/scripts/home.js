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

function addProfileInfo() {
    let divUserNameElements = document.getElementsByClassName("divUserName");

    for (let i = 0; i < divUserNameElements.length; i++) {
        const divUserName = divUserNameElements[i];
        divUserName.innerHTML = `<a href="profile.html">${userName}</a>`;
    }
}

// Restante de tu código
document.addEventListener("DOMContentLoaded", function () {
    addProfileInfo();
});
