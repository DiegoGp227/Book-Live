function toggleMenu(menuId) {
    const menus = ["expandableProfile", "infoCards", "menuForm", "menuEdit"]; // Incluye `menuEdit` en la lista
    const userNameNav = document.getElementById("userNameNav");

    menus.forEach(id => {
        const menu = document.getElementById(id);
        if (id === menuId) {
            const isHidden = menu.style.display === "none" || menu.style.display === "";
            menu.style.display = isHidden ? "flex" : "none";

            if (menuId === "expandableProfile") {
                userNameNav.style.display = isHidden ? "none" : "flex";
            }
        } else {
            menu.style.display = "none";
        }
    });
}

// Funciones para abrir los menús específicos
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
    toggleMenu("menuEdit"); // Llama a `toggleMenu` para abrir `menuEdit`
}

// Evento para cerrar los menús al hacer clic fuera de ellos
document.addEventListener("click", function (e) {
    const expandableProfile = document.getElementById("expandableProfile");
    const userNameNav = document.getElementById("userNameNav");
    const infoCards = document.getElementById("infoCards");
    const menuForm = document.getElementById("menuForm");
    const menuEdit = document.getElementById("menuEdit");

    // Cerrar expandableProfile si se hace clic fuera
    if (expandableProfile.style.display === "flex" &&
        !expandableProfile.contains(e.target) &&
        !e.target.closest('#profileButton')) {
        expandableProfile.style.display = "none";
        userNameNav.style.display = "flex";
    }

    // Cerrar infoCards si se hace clic fuera
    if (infoCards.style.display === "flex" &&
        !infoCards.contains(e.target) &&
        !e.target.closest('#moreInfoButton')) {
        infoCards.style.display = "none";
    }

    // Cerrar menuForm si se hace clic fuera
    if (menuForm.style.display === "flex" &&
        !menuForm.contains(e.target) &&
        !e.target.closest('#newActivityButton')) {
        menuForm.style.display = "none";
    }

    // Cerrar menuEdit si se hace clic fuera y excluyendo el botón de edición
    if (menuEdit.style.display === "flex" &&
        !menuEdit.contains(e.target) &&
        !e.target.closest('#editButton')) { // Asegura que el botón de edición no cierre el menú
        menuEdit.style.display = "none";
    }
});
