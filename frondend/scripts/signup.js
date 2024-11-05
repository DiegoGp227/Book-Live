//// get data to sign up and send to backend

// get to data to form  
async function getDataSignUp() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dataUserObject = {
        username: username,
        email: email,
        password: password
    };
    await sendDataSignUp(dataUserObject);
}

// send data 
async function sendDataSignUp(dataUserObject) {
    const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataUserObject),
        credentials: 'include'
    }).then(response => {
        if(response.status === 201){
            window.location.href = '../pages/home.html';
        }
    })
}

let buttonSendData = document.getElementById("buttonSendData")

// call to funtion get date and send date
buttonSendData.addEventListener("click", async (event) => {
    event.preventDefault();
    await getDataSignUp();
    let form = document.getElementById("loginForm").reset();
});

