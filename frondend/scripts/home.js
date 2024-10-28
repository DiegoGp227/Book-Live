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

// Muestra todas las cookies en la consola



console.log(document.cookie.id);
