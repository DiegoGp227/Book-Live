// Handles closing and opening expandable menus
function profile() {
    const expandableProfile = document.getElementById("expandableProfile");
    expandableProfile.style.display = (expandableProfile.style.display === "none" || expandableProfile.style.display === "") ? "flex" : "none";
}

function newActivityButton() {
    const menuForm = document.getElementById("menuForm");
    menuForm.style.display = (menuForm.style.display === "none" || menuForm.style.display === "") ? "flex" : "none";
}

document.addEventListener("click", function (e) {
    const expandableProfile = document.getElementById("expandableProfile");
    const menuForm = document.getElementById("menuForm");

    if (expandableProfile.style.display === "flex" && 
        !expandableProfile.contains(e.target) && 
        !e.target.closest('#profileButton')) {
        expandableProfile.style.display = "none";
    }

    if (menuForm.style.display === "flex" && 
        !menuForm.contains(e.target) && 
        !e.target.closest('#newActivityButton')) {
        menuForm.style.display = "none";
    }
});