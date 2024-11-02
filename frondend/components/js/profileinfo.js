async function verifyToken() {
    const token = getCookieValue("token");
    try {
        const response = await fetch("http://localhost:5000/api/tokenvalidation", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(data => {
                console.log('Respuesta pt:', data);
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