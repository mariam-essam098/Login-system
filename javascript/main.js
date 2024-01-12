// signup 

let userNameInput = document.getElementById('userNameInput');
let userEmailInput = document.getElementById('userEmailInput');
let userPasswordInput = document.getElementById('userPasswordInput');
let userNameAlert = document.getElementById('userNameAlert');
let userEmailAlert = document.getElementById('userEmailAlert');
let userPasswordAlert = document.getElementById('userPasswordAlert');
let successMessage = document.getElementById('successMessage');
let signIn = document.getElementById('signIn');
let tryAgainMessage = document.getElementById('tryAgainMessage');
let accountExist = document.getElementById('accountExist');
let userInfo;

//check local storage is empty or not 
if (localStorage.getItem('users') == null) {
    userInfo = [];
}
else {
    userInfo = JSON.parse(localStorage.getItem('users'));
}

function signUpUser() {
    userInputsValidation();
    isExist();

    if (userInputsValidation() == true && isExist() == false) {
        let user = {
            name: userNameInput.value,
            email: userEmailInput.value,
            password: userPasswordInput.value
        }
        userInfo.push(user);
        localStorage.setItem('users', JSON.stringify(userInfo));
        successMessage.classList.replace('d-none', 'd-block');
        signIn.classList.replace('d-none', 'd-block');

    } else {
        tryAgainMessage.classList.replace('d-none', 'd-block')
    }


}

//if data not correct shor error messgae 
function userNameValidation() {
    let regex = /^[A-Za-z]{3,10}(\s?[A-Za-z]{3,10})?$/;

    if (regex.test(userNameInput.value) == true && userNameInput.value != '') {
        userNameInput.classList.add('is-valid');
        userNameInput.classList.remove('is-invalid');
        userNameAlert.classList.replace('d-block', 'd-none');
        return true;
    } else {
        userNameInput.classList.add('is-invalid');
        userNameInput.classList.remove('is-valid');
        userNameAlert.classList.replace('d-none', 'd-block');
        return false;
    }

}
//if data not correct shor error messgae 
function userEmailValidation() {
    let regex = /@[a-z]{5,10}(\.com)$/;
    if (regex.test(userEmailInput.value) == true && userEmailInput.value != '') {
        userEmailInput.classList.add('is-valid');
        userEmailInput.classList.remove('is-invalid');
        userEmailAlert.classList.replace('d-block', 'd-none');
        return true;
    } else {
        userEmailInput.classList.add('is-invalid');
        userEmailInput.classList.remove('is-valid');
        userEmailAlert.classList.replace('d-none', 'd-block');
        return false;
    }
}
//if data not correct shor error messgae 

function userPasswordValidation() {
    let regex = /^.{5,15}$/;
    if (regex.test(userPasswordInput.value) == true && userPasswordInput.value != '') {
        userPasswordInput.classList.add('is-valid');
        userPasswordInput.classList.remove('is-invalid');
        userPasswordAlert.classList.replace('d-block', 'd-none');
        return true;
    } else {
        userPasswordInput.classList.add('is-invalid');
        userPasswordInput.classList.remove('is-valid');
        userPasswordAlert.classList.replace('d-none', 'd-block');
        return false;
    }
}

//check the three inputs
function userInputsValidation() {
    userNameValidation();
    userEmailValidation();
    userPasswordValidation();

    if ((userNameValidation() == true && userEmailValidation() == true
        && userPasswordValidation() == true)) {
        return true;
    } else {
        return false;
    }
}

//Make data in lower case 
function isExist() {

    for (let i = 0; i < userInfo.length; i++) {

        if (userInfo[i].name.toLowerCase() == userNameInput.value.toLowerCase() ||
            userInfo[i].email.toLowerCase() == userEmailInput.value.toLowerCase()) {

            accountExist.classList.replace('d-none', 'd-block');
            userNameInput.classList.remove('is-valid');
            userEmailInput.classList.remove('is-valid');
            userPasswordInput.classList.remove('is-valid');

            return true;
        }
    }
    return false;
}


function logIn() {
    let loginEmail = document.getElementById('loginEmail');
    let loginPassword = document.getElementById('loginPassword');
    let fillMessage = document.getElementById('fillMessage');
    let wrongMessage = document.getElementById('wrongMessage');
    let loginBtn = document.getElementById('loginBtn');
    let signUp = document.getElementById('signUp');

    if (loginEmail.value == "" || loginPassword.value == "") {
        fillMessage.classList.replace('d-none', 'd-block');
        return false;
    }

    for (let i = 0; i < userInfo.length; i++) {
        if (userInfo[i].email.toLowerCase() == loginEmail.value.toLowerCase()
            && userInfo[i].password.toLowerCase() == loginPassword.value.toLowerCase()) {

            localStorage.setItem('sessionUserName', JSON.stringify(userInfo[i].name));
            window.location.href = './welcome.html';
            return true;
        }
    }


    wrongMessage.classList.remove('d-none');
    fillMessage.classList.add('d-none');
    return false;
}



function displayWelcomeUser() {
    let userName = JSON.parse(localStorage.getItem('sessionUserName'));

    let userNameWelcome = document.getElementById('userNameWelcome')
    userNameWelcome.innerHTML = 'Welcome ' + userName;

}

function logout() {
    localStorage.removeItem('sessionUserName');
    window.location.href = './index.html';

}