async function getDataLogIn() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const credentialsObjet = {
        email: email,
        password: password
    };
    await sendDataLogIn(credentialsObjet);
}
async function sendDataLogIn(credentialsObjet) {
    const send = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentialsObjet),
        credentials: 'include'
    })
    .then(data => {
        console.log('Respuesta pt:', data); 
        if(data.status === 200){
            window.location.href = '../pages/home.html';
        }
    });
}
const buttonSendCredentials = document.getElementById("buttonSendCredentials");

buttonSendCredentials.addEventListener("click", async (event) =>{
    event.preventDefault();
    await getDataLogIn();
    let form = document.getElementById("loginForm").reset();
})

