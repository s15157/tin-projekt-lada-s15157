const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "string.min":
                err.message = `Pole powinno zawierać co najmniej ${err.local.limit} znaki`;
                break;
            case "string.max":
                err.message = `Pole powinno zawierać co najwyżej ${err.local.limit} znaki`;
                break;
            case "string.email":
                err.message = `Pole powinno zawierać prawidłowy adres email`;
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

const carSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow(""),
    brand: Joi.string()
        .required()
        .error(errMessages),
    model: Joi.string()
        .required()
        .error(errMessages),
    engine: Joi.number()
        .required()
        .error(errMessages),
    power: Joi.number()
        .required()
        .error(errMessages),
    type: Joi.string()
        .required()
        .error(errMessages),
    price: Joi.number()
        .required()
        .error(errMessages),
    bail: Joi.number()
        .required()
        .error(errMessages)
});

module.exports = carSchema;