function validateForm() {
    const brandInput = document.getElementById('brand');
    const modelInput = document.getElementById('model');
    const engineInput = document.getElementById('engine');
    const powerInput = document.getElementById('power'); 
    const typeInput = document.getElementById('type'); 
    const priceInput = document.getElementById('price');
    const bailInput = document.getElementById('bail'); 

   resetErrors([brandInput, modelInput, engineInput, powerInput, typeInput, priceInput, bailInput], [errorBrand, errorModel, errorEngine, errorPower, errorType, errorPrice, errorBail], errorsSummary); 
    //resetErrors([brandInput, modelInput, generationInput], [errorBrand, errorModel, errorGeneration], errorsSummary);
    let valid = true;  


    //Marka
    if (!checkRequired(brandInput.value)) {
        valid = false;
        brandInput.classList.add("error-input");
        errorBrand.innerText = "Pole jest wymagane";
    }

    //Model
    if (!checkRequired(modelInput.value)) {
        valid = false;
        modelInput.classList.add("error-input");
        errorModel.innerText = "Pole jest wymagane";
    }

    //Silnik
    if (!checkRequired(engineInput.value)) {
        valid = false;
        engineInput.classList.add("error-input");
        errorEngine.innerText = "Pole jest wymagane";
    }

    //Moc
    if (!checkRequired(powerInput.value)) {
        valid = false;
        powerInput.classList.add("error-input");
        errorPower.innerText = "Pole jest wymagane";
    }

    //Typ
    if (!checkRequired(typeInput.value)) {
        valid = false;
        typeInput.classList.add("error-input");
        errorType.innerText = "Pole jest wymagane";
    }

    //Cena
    if (!checkRequired(priceInput.value)) {
        valid = false;
        priceInput.classList.add("error-input");
        errorPrice.innerText = "Pole jest wymagane";
    }

    //Kaucja
    if (!checkRequired(bailInput.value)) {
        valid = false;
        bailInput.classList.add("error-input");
        errorBail.innerText = "Pole jest wymagane";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}