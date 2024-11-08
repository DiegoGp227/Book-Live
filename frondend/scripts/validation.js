function getCookieValue(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

async function verifyToken() {
    const token = getCookieValue("token");
    try {
        const response = await fetch("http://localhost:5000/api/tokenvalidation", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(data => {
                if (data.status === 200) {
                } else {
                    window.location.href = '../pages/login.html';
                }
            });
    } catch (error) {
        console.error("Error verifying token:", error);
        return false;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    verifyToken()
})