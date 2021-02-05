function validateForm() {
    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password'); 
    resetErrors([firstNameInput, lastNameInput, emailInput,  passwordInput], [errorFirstName, errorLastName, errorEmail, errorPassword], errorsSummary); 
    let valid = true;  


    //IMIE
    if (!checkRequired(firstNameInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(firstNameInput.value, 2, 60)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    //Nazwisko
    if (!checkRequired(lastNameInput.value)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(lastNameInput.value, 2, 60)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    //Email
    if (!checkRequired(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(emailInput.value, 5, 60)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Pole powinno zawierać od 5 do 60 znaków";
    } else if (!checkEmail(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Pole powinno zawierać prawidłowy adres email";
    }

    //Hasło
    if (!checkRequired(passwordInput.value)) {
        valid = false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = "Pole jest wymagane";
    } 

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}

