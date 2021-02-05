function validateForm() {
    const customerInput = document.getElementById('customer');
    const carInput = document.getElementById('car');
    const dateFromInput = document.getElementById('dateFrom');
    const dateToInput = document.getElementById('dateTo');
    const priceInput = document.getElementById('price'); 
    const bailInput = document.getElementById('bail'); 
    
    resetErrors([customerInput, carInput, dateFromInput, dateToInput, priceInput, bailInput], [errorCustomer,errorCar, errorFromDate, errorToDate, errorPrice, errorBail], errorsSummary)    
    let valid = true;  


    //CUSTOMER
    if (customerInput.value == "") {
        valid = false;
        customerInput.classList.add("error-input");
        errorCustomer.innerText = "Pole jest wymagane";
    }

    //CAR
    if (carInput.value == "") {
        valid = false;
        carInput.classList.add("error-input");
        errorCar.innerText = "Pole jest wymagane";
    }

    //Date From
    if(!checkRequired(dateFromInput.value)) {
        valid = false;
        dateFromInput.classList.add("error-input");
        errorFromDate.innerText = "Pole jest wymagane";
    } else if (checkDateIfAfter(dateFromInput.value, dateToInput.value)) {
        valid = false;
        dateToInput.classList.add("error-input");
        errorFromDate.innerText = "Data wypożyczenia nie może być późniejsza niż oddania!";
    }

    //Date To
     if(!checkRequired(dateToInput.value)) {
        valid = false;
        dateToInput.classList.add("error-input");
        errorToDate.innerText = "Pole jest wymagane";
    } else if (!checkDateIfAfter(dateToInput.value, dateFromInput.value)) {
        valid = false;
        dateToInput.classList.add("error-input");
        errorToDate.innerText = "Data oddania nie może być wcześniej niż data wypożyczenia!";
    }

    //Price
    if(!checkRequired(priceInput.value)) {
        valid = false;
        priceInput.classList.add("error-input");
        errorPrice.innerText = "Pole jest wymagane";
    }

    //Bail
    if(!checkRequired(bailInput.value)) {
        valid = false;
        bailInput.classList.add("error-input");
        errorBail.innerText = "Pole jest wymagane";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}

