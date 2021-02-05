function resetErrors(inputs, errorTexts, errorInfo) {
    for(let i=0; i<inputs.length; i++) {
        inputs[i].classList.remove("error_input");
    }
    for(let i=0; i<errorTexts.length; i++) {
        errorTexts[i].innerText = "";
    }
    errorInfo.innerText = "";
}

function checkRequired(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    if (value === "") {
        return false;
    }
    return true;
}

function checkTextLengthRange(value, min, max) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const length = value.length;
    if (max && length > max) {
        return false;
    }
    if (min && length < min) {
        return false;
    }
    return true;
}

function checkEmail(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(value);
}

// function checkPesel(pesel) {
//     var reg = /^[0-9]{11}$/;
//     if(reg.test(pesel) == false) 
//         return false;
//     else
//     {
//         var digits = (""+pesel).split("");
//         if ((parseInt(pesel.substring( 4, 6)) > 31)||(parseInt(pesel.substring( 2, 4)) > 12))
//             return false;
         
//         var checksum = (1*parseInt(digits[0]) + 3*parseInt(digits[1]) + 7*parseInt(digits[2]) + 9*parseInt(digits[3]) + 1*parseInt(digits[4]) + 3*parseInt(digits[5]) + 7*parseInt(digits[6]) + 9*parseInt(digits[7]) + 1*parseInt(digits[8]) + 3*parseInt(digits[9]))%10;
//         if(checksum==0) checksum = 10;
//             checksum = 10 - checksum;
 
//         return (parseInt(digits[10])==checksum);
//     }
// }

function checkNumber(value) {
    if (!value) {
        return false;
    }
    if (isNaN(value)) {
        return false;
    }
    return true;
}

function checkPesel(value) {
    if (!value) {
        return false;
    }
    if (isNaN(value)) {
        return false;
    }
    if(value.length != 11){
        return false;
    }
    return true;
}

function checkNumberRange(value, min, max) {
    if (!value) {
        return false;
    }
    if (isNaN(value)) {
        return false;
    }
    value = parseFloat(value);
    if (value < min) {
        return false;
    }
    if (value > max) {
        return false;
    }
    return true;
}

function checkDate(value) {
    if (!value) {
        return false;
    }
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    return pattern.test(value);
}

function checkDateIfAfter(value, compareTo) {
    if (!value) {
        return false;
    }
    if (!compareTo) {
        return false;
    }
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    if (!pattern.test(value)) {
        return false;
    }
    if (!pattern.test(compareTo)) {
        return false;
    }
    const valueDate = new Date(value);
    const compareToDate = new Date(compareTo);
    if (valueDate.getTime() < compareToDate.getTime()) {
        return false;
    }
    return true;
}