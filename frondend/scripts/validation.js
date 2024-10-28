function getCookieValue(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

const token = getCookieValue("token");
async function verifyToken() {
    const token = getCookieValue("token");  // Obtén el token de las cookies

    if (!token) {
        console.log("No token found in cookies");
        return false;
    }

    try {
        const response = await fetch("http://localhost:5000/api/verify-token", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  // Envía el token como Bearer en el encabezado
            }
        });

        if (!response.ok) {
            console.log("Token is invalid or expired");
            return false;
        }

        const data = await response.json();
        console.log("Token is valid", data);
        return true;

    } catch (error) {
        console.error("Error verifying token:", error);
        return false;
    }
}

