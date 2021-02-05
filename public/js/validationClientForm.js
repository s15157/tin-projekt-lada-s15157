function validateForm() {
    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const peselInput = document.getElementById('pesel'); 
    resetErrors([firstNameInput, lastNameInput, emailInput, peselInput], [errorFirstName, errorLastName, errorEmail, errorPesel], errorsSummary); 
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

    //PESEL
    if (!checkRequired(peselInput.value)) {
        valid = false;
        peselInput.classList.add("error-input");
        errorPesel.innerText = "Pole jest wymagane";
    } else if (!checkPesel(peselInput.value)) {
        valid = false;
        peselInput.classList.add("error-input");
        errorPesel.innerText = "Pole powinno zawierać ciąg 11 liczb";
    } 

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}

