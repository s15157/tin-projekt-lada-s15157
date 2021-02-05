const RentRepository = require('../repository/mysql2/RentRepository');
const CustomerRepository = require('../repository/mysql2/CustomerRepository');
const CarRepository = require('../repository/mysql2/CarRepository');

exports.showRentList = (req, res, next) => {
    RentRepository.getRent()
    .then(rents => {
        res.render('pages/rent/list', {
            rent: rents,
            navLocation: 'rent',
            success: ''
        });
    });
}

exports.showAddRentForm = (req, res, next) => {

    let allCustomers, allCars, rents;
    
    CustomerRepository.getCustomer()
        .then(customers => {
            allCustomers = customers;
            return CarRepository.getCar();
        })
        .then(cars => {
            allCars = cars;
            res.render('pages/rent/formAdd', {
                rent: {},
                formMode: 'edit',
                allCustomers: allCustomers,
                allCars: allCars,
                pageTitle: 'Nowe wypożyczenia',
                btnLabel: 'Dodaj wypożyczenie',
                formAction: '/rent/add',
                navLocation: 'rent',
                validationErrors: []
                })
        });
}

exports.showEditRentForm = (req, res, next) => {
    const rentId = req.params.rentId;
    let allCustomers, allCars;
    
    CustomerRepository.getCustomer()
        .then(customers => {
            allCustomers = customers;
            return CarRepository.getCar();
        })
        .then(cars => {
            allCars = cars;
            return RentRepository.getRentById(rentId);
        })
        .then(rent => {
            res.render('pages/rent/form', {
                rent: rent,
                rentId: rentId,
                formMode: 'edit',
                allCustomers: allCustomers,
                allCars: allCars,
                pageTitle: 'Szczegóły wypożyczenia',
                btnLabel: 'Edytuj wypożyczenie',
                formAction: '/rent/edit',
                navLocation: 'rent',
                validationErrors: []
                })
        });
}

exports.showRentDetails = (req, res, next) => {

    const rentId = req.params.rentId;
    let allCustomers, allCars;
    
    CustomerRepository.getCustomer()
        .then(customers => {
            allCustomers = customers;
            return CarRepository.getCar();
        })
        .then(cars => {
            allCars = cars;
            return RentRepository.getRentById(rentId);
        })
        .then(rent => {
            res.render('pages/rent/form', {
                rent: rent,
                rentId: rentId,
                formMode: 'showDetails',
                allCustomers: allCustomers,
                allCars: allCars,
                pageTitle: 'Szczegóły wypożyczenia',
                btnLabel: 'Edytuj wypożyczenie',
                formAction: '',
                navLocation: 'rent',
                validationErrors: []
                })
        });
        
    
}

exports.addRent = (req, res, next) => {
    const rentData = { ...req.body };
    console.log("Ciemno" + rentData.customer_id + " : " + rentData.car_id + " : " + rentData.dateFrom + " : " + rentData.dateTo + " : " + rentData.price + " : " + rentData.bail);
    RentRepository.createRent(rentData)
        .then(result => {
            RentRepository.getRent()
                .then(rents => {
                    res.render('pages/rent/list', {
                        rent: rents,
                        navLocation: 'rent',
                        success: 'Dodano nowe wypożyczenie!'
                    });
                }).catch(err => {
                    CustomerRepository.getCustomer()
                        .then(customers => {
                            allCustomers = customers;
                            return CarRepository.getCar();
                        })
                        .then(cars => {
                            allCars = cars;
                            res.render('pages/rent/formAdd', {
                                rent: {},
                                formMode: 'edit',
                                allCustomers: allCustomers,
                                allCars: allCars,
                                pageTitle: 'Nowe wypożyczenia',
                                btnLabel: 'Dodaj wypożyczenie',
                                formAction: '/rent/add',
                                navLocation: 'rent',
                                // validationErrors: err.details
                            })
                        });    
                });
                                
        });
};

exports.updateRent = (req, res, next) => {
    const rentId = req.body._id;
    const rentData = { ...req.body };
    RentRepository.updateRent(rentId, rentData)
        .then(result => {
            RentRepository.getRent()
                .then(rents => {
                    res.render('pages/rent/list', {
                        rent: rents,
                        navLocation: 'rent',
                        success: 'Zaktualizowano wypożyczenie!'
                    });
                }).catch(err => {
                    res.render('pages/rent/form', {
                        rent: rent,
                        rentId: rentId,
                        formMode: 'edit',
                        allCustomers: allCustomers,
                        allCars: allCars,
                        pageTitle: 'Szczegóły wypożyczenia',
                        btnLabel: 'Edytuj wypożyczenie',
                        formAction: '/rent/edit',
                        navLocation: 'rent',
                        validationErrors: err.details
                    }) 
                })
        }); 
    
};

exports.deleteRent = (req, res, next) => {
    const rentId = req.params.rentId;
    RentRepository.deleteRent(rentId)
        .then(() => {
            RentRepository.getRent()
                .then(rents => {
                    res.render('pages/rent/list', {
                        rent: rents,
                        navLocation: 'rent',
                        success: 'Usunięto wypożyczenie!'
                    });
                });
        });
};