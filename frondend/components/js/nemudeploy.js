function toggleMenu(menuId) {
    const menus = ["expandableProfile", "infoCards", "menuForm"]; // Lista con todos los menús
    const userNameNav = document.getElementById("userNameNav");

    menus.forEach(id => {
        const menu = document.getElementById(id);
        if (id === menuId) {
            // Alterna el menú seleccionado
            const isHidden = menu.style.display === "none" || menu.style.display === "";
            menu.style.display = isHidden ? "flex" : "none";

            // Controla la visibilidad de userNameNav solo para expandableProfile
            if (menuId === "expandableProfile") {
                userNameNav.style.display = isHidden ? "none" : "flex"; // Cambia a none si está visible
            }
        } else {
            // Cierra todos los otros menús
            menu.style.display = "none";
        }
    });
}

// Función para abrir el perfil
function profile() {
    toggleMenu("expandableProfile");
}

function openMoreInfo() {
    toggleMenu("infoCards");
}

function newActivityButton() {
    toggleMenu("menuForm");
}

function editActivityButton() {
    const menuForm = document.getElementById("menuForm");
    const infoCards = document.getElementById("infoCards");

    if (menuForm.style.display === "none" || menuForm.style.display === "") {
        menuForm.style.display = "flex";
        infoCards.style.display = "none";
    }
};

// Evento para cerrar los menús al hacer clic fuera de ellos
document.addEventListener("click", function (e) {
    const expandableProfile = document.getElementById("expandableProfile");
    const divUserName = document.getElementsByClassName("divUserName");
    const infoCards = document.getElementById("infoCards");
    const menuForm = document.getElementById("menuForm");

    // Si expandableProfile está abierto y clic fuera, se cierra y divUserName se muestra
    if (expandableProfile.style.display === "flex" &&
        !expandableProfile.contains(e.target) &&
        !e.target.closest('#profileButton')) {
        expandableProfile.style.display = "none";
        divUserName.style.display = "flex";
    }

    // Si infoCards está abierto y clic fuera, se cierra
    if (infoCards.style.display === "flex" &&
        !infoCards.contains(e.target) &&
        !e.target.closest('#moreInfoButton')) {
        infoCards.style.display = "none";
    }

    // Si menuForm está abierto y clic fuera, se cierra
    if (menuForm.style.display === "flex" &&
        !menuForm.contains(e.target) &&
        !e.target.closest('#newActivityButton')) {
        menuForm.style.display = "none";
    }
});