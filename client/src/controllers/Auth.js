const email = document.getElementById('email');
const password = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const emailRegister = document.getElementById('emailRegister');
const passwordRegister = document.getElementById('passwordRegister');
const usernameRegister = document.getElementById('usernameRegister');
const wrp = document.getElementById('wrapper');


loginBtn.addEventListener('click', async () => {
    const emailVal = email.value;
    const passwordVal = password.value;
    fetch(`http://localhost:3000/LoginUser/${emailVal}/${passwordVal}`)
    .then((res) => res.json())
    .then((data) => {
        window.location.href = "file:///D:/My%20Project/my-elctron-app/client/src/views/index.html";
    })
    .catch((err) => console.log(err.message));
    });
    
registerBtn.addEventListener('click', async () => {

    const usernameVal = usernameRegister.value;
    const emailVal = emailRegister.value;
    const passwordVal = passwordRegister.value;

    fetch(`http://localhost:3000/addUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: usernameVal,
            email: emailVal,
            password: passwordVal
        })
    }) 
    .then((res) => res.json())
    .then((data) => {
        wrp.classList.remove('active');
        console.log(data)
    })
    .catch((err) => console.log(err.message));
    });