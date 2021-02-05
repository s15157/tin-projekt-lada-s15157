const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "date.required":
                err.message = `Podaj datę`;
                break;
            case "date.greater":
                err.message = `Data musi być późniejsza niż data wypożyczenia`;
                break;
            case "number.required":
                err.message = `Pole musi być liczbą`;
                break;
            default:
                break;
        }
    });
    return errors;
}

const rentSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow(""),
    customer_id: Joi.number()
        .error(errMessages),
    car_id: Joi.string()
        .required()
        .error(errMessages),
    dateFrom: Joi.date()
        .required()
        .error(errMessages),
    dateTo: Joi.date()
        .required()
        .error(errMessages),
    price: Joi.number()
        .required()
        .error(errMessages),
    bail: Joi.number()
        .required()
        .error(errMessages)
});

module.exports = rentSchema;