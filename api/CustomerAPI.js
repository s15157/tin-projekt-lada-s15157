const CustomerRepository = require('../repository/mysql2/CustomerRepository');

exports.getCustomer = (req, res, next) => {
    CustomerRepository.getCustomer()
        .then(customer => {
            res.status(200).json(customer);
        })
        .catch(err => {
           console.log(err);
        });
};

exports.getCustomerById = (req, res, next) => {
    const customerId = req.params.customerId;
    CustomerRepository.getCustomerById(customerId)
        .then(customer => {
            if(!customer) {
                res.status(404).json({
                    message: 'Customer with id: '+customerId+' not found'
                })
            } else {
                res.status(200).json(customer);
            }
        });
};

exports.createCustomer = (req, res, next) => {
    CustomerRepository.createCustomer(req.body)
        .then(newObj => {
           res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateCustomer = (req, res, next) => {
    const customerId = req.params.customerId;
    CustomerRepository.updateCustomer(customerId, req.body)
        .then(result => {
           res.status(200).json({message: 'Customer updated!', customer: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteCustomer = (req, res, next) => {
    const customerId = req.params.customerId;
    CustomerRepository.deleteCustomer(customerId)
        .then(result => {
            res.status(200).json({message: 'Removed customer', customer: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};