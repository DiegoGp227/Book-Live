// Handles closing and opening expandable menus
function profile() {
    const expandableProfile = document.getElementById("expandableProfile");
    const userNameNav = document.getElementById("userNameNav");
    expandableProfile.style.display = (expandableProfile.style.display === "none" || expandableProfile.style.display === "") ? "flex" : "none";
    if (expandableProfile.style.display === "flex") {
        userNameNav.style.display = "none";
    } else if (expandableProfile.style.display === "none") {
        userNameNav.style.display = "flex";
    }
}

function newActivityButton() {
    const menuForm = document.getElementById("menuForm");
    menuForm.style.display = (menuForm.style.display === "none" || menuForm.style.display === "") ? "flex" : "none";
}

document.addEventListener("click", function (e) {
    const expandableProfile = document.getElementById("expandableProfile");
    const userNameNav = document.getElementById("userNameNav");
    const menuForm = document.getElementById("menuForm");

    if (expandableProfile.style.display === "flex" && 
        !expandableProfile.contains(e.target) && 
        !e.target.closest('#profileButton')) {
        expandableProfile.style.display = "none";
        userNameNav.style.display = "flex";
    }

    if (menuForm.style.display === "flex" && 
        !menuForm.contains(e.target) && 
        !e.target.closest('#newActivityButton')) {
        menuForm.style.display = "none";
    }
});

// ////////////////////////

// function getCookieValue(name) {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(';').shift();
// }

// function getInfoProfile() {
//     const userId = getCookieValue('userId');
//     fetch("http://localhost:5000/api/infoprofile", {
//         method: "GET",
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${userId}`
//         },
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Error en la respuesta de la API');
//         }
//         return response.json(); // Asegúrate de convertir la respuesta a JSON
//     })
//     .then(data => {
//         const userData = data[0]; // Accede al primer elemento del array
//         addProfileInfo(userData);
//     })
// };

// /// fata bucle apra sumar libros y lsita de deseos
// // let falta 
// function addProfileInfo(userData) {
//     let mainTwo = document.getElementById("mainTwo")
//     mainTwo.innerHTML = "";
//     mainTwo.innerHTML += `
//         <h2>${userData.username}</h2>
//         <div id="userInfo">
//           <p>${userData.email}</p>
//         </div>
//     `
// };


// document.addEventListener("DOMContentLoaded", function () {
//     // preventDefault();
//     getInfoProfile();
// })