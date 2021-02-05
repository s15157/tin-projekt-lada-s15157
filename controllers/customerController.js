const CustomerRepository = require('../repository/mysql2/CustomerRepository');

exports.showCustomerList = (req, res, next) => {
    CustomerRepository.getCustomer()
    .then(customers => {
        res.render('pages/customer/list', {
            customers: customers,
            navLocation: 'customer',
            success: ''
        });
    });
    
}

exports.showAddCustomerForm = (req, res, next) => {
    res.render('pages/customer/form', { 
        customer: {},
        pageTitle: 'Nowy klient',
        formMode: 'createNew',
        btnLabel: 'Dodaj klienta',
        formAction: '/customer/add',
        navLocation: 'customer',
        validationErrors: []
    });
}

exports.showEditCustomerForm = (req, res, next) => {
    const customerId = req.params.customerId;
    CustomerRepository.getCustomerById(customerId)
        .then(customer => {
            res.render('pages/customer/form', {
                customer: customer,
                formMode: 'edit',
                pageTitle: 'Edycja klienta',
                btnLabel: 'Edytuj klienta',
                formAction: '/customer/edit',
                navLocation: 'customer',
                validationErrors: []
            });
        });
}

exports.showCustomerDetails = (req, res, next) => {
    const customerId = req.params.customerId;
    CustomerRepository.getCustomerById(customerId)
        .then(customer => {
            res.render('pages/customer/form', {
                customer: customer,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły klienta',
                btnLabel: 'Edytuj klienta',
                formAction: '',
                navLocation: 'customer',
                validationErrors: []
            });
        });
}

exports.addCustomer = (req, res, next) => {
    const customerData = { ...req.body };
    
    CustomerRepository.createCustomer(customerData)
        .then( result => {
            CustomerRepository.getCustomer()
                .then(customers => {
                    res.render('pages/customer/list', {
                        customers: customers,
                        navLocation: 'customer',
                        success: 'Dodano klienta do bazy!'
                    });
                });
        }).catch(err => {
            res.render('pages/customer/form', {
                customer: customerData,
                pageTitle: 'Dodawanie klienta',
                formMode: 'createNew',
                btnLabel: 'Dodaj klienta',
                formAction: '/customer/add',
                navLocation: 'customer',
                validationErrors: err.details
            });
        });
};

exports.updateCustomer = (req, res, next) => {
    const customerId = req.body._id;
    const customerData = { ...req.body };
    console.log(customerId + " : " + customerData.firstName + " : " + customerData.lastName + " : " + customerData.email + " : " + customerData.pesel);
    CustomerRepository.updateCustomer(customerId, customerData)
    .then( result => {
        CustomerRepository.getCustomer()
                .then(customers => {
                    res.render('pages/customer/list', {
                        customers: customers,
                        navLocation: 'customer',
                        success: 'Zaktualizowano dane klienta!'
                    });
                });
    }).catch(err => {
        res.render('pages/customer/form', {
            customer: customerData,
            pageTitle: 'Edycja klienta',
            formMode: 'edit',
            btnLabel: 'Edytuj klienta',
            formAction: '/customer/edit',
            navLocation: 'customer',
            validationErrors: err.details
        });
    });
};

exports.deleteCustomer = (req, res, next) => {
    const customerId = req.params.customerId;
    CustomerRepository.deleteCustomer(customerId)
    .then( () => {
        CustomerRepository.getCustomer()
                .then(customers => {
                    res.render('pages/customer/list', {
                        customers: customers,
                        navLocation: 'customer',
                        success: 'Usunięto klienta z bazy!'
                    });
                });
    });
};