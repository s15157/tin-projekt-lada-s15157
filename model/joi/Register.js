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

const userSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow(""),
    firstName: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    lastName: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    email: Joi.string()
        .email()
        .required()
        .error(errMessages),
    password: Joi.string()
        .required()
        .error(errMessages)
});

module.exports = userSchema;