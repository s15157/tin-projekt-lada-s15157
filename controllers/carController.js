const CarRepository = require('../repository/mysql2/CarRepository');

exports.showCarList = (req, res, next) => {
    CarRepository.getCar()
    .then(cars => {
        res.render('pages/car/list', {
            car: cars,
            navLocation: 'car',
            success: ''
        });
    });
}

exports.showAddCarForm = (req, res, next) => {
    res.render('pages/car/form', { 
        car: {},
        pageTitle: 'Nowy samochód',
        formMode: 'createNew',
        btnLabel: 'Dodaj samochód',
        formAction: '/car/add',
        navLocation: 'car',
        validationErrors: []
    });
}

exports.showEditCarForm = (req, res, next) => {
    const carId = req.params.carId;
    CarRepository.getCarById(carId)
        .then(car => {
            res.render('pages/car/form', {
                car: car,
                formMode: 'edit',
                pageTitle: 'Edycja samochodu',
                btnLabel: 'Edytuj samochód',
                formAction: '/car/edit',
                navLocation: 'car',
                validationErrors: []
            });
        });
}

exports.showCarDetails = (req, res, next) => {
    const carId = req.params.carId;
    CarRepository.getCarById(carId)
        .then(car => {
            res.render('pages/car/form', {
                car: car,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły samochodu',
                btnLabel: 'Edytuj samochód',
                formAction: '',
                navLocation: 'car',
                validationErrors: []
            });
        });
}


exports.addCar = (req, res, next) => {
    const carData = { ...req.body };
    CarRepository.createCar(carData)
        .then(result => {
            CarRepository.getCar()
                .then(cars => {
                    res.render('pages/car/list', {
                        car: cars,
                        navLocation: 'car',
                        success: 'Dodano nowy samochód!'
                    });
                });
        }).catch(err => {
            res.render('pages/car/form', { 
                car: {},
                pageTitle: 'Nowy samochód',
                formMode: 'createNew',
                btnLabel: 'Dodaj samochód',
                formAction: '/car/add',
                navLocation: 'car',
                validationErrors: err.details
            });
        });
};

exports.updateCar = (req, res, next) => {
    const carId = req.body._id;
    const carData = { ...req.body };
    CarRepository.updateCar(carId, carData)
        .then(result => {
            CarRepository.getCar()
                .then(cars => {
                    res.render('pages/car/list', {
                        car: cars,
                        navLocation: 'car',
                        success: 'Zaktualizowano samochód!'
                    });
                }).catch(err => {
                    res.render('pages/car/form', {
                        car: car,
                        formMode: 'showDetails',
                        pageTitle: 'Szczegóły samochodu',
                        btnLabel: 'Edytuj samochód',
                        formAction: '',
                        navLocation: 'car',
                        validationErrors: err.details
                    });
                });
        }); 
};

exports.deleteCar = (req, res, next) => {
    const carId = req.params.carId;
    CarRepository.deleteCar(carId)
        .then(() => {
            CarRepository.getCar()
                .then(cars => {
                    res.render('pages/car/list', {
                        car: cars,
                        navLocation: 'car',
                        success: 'Usunięto samochód!'
                    });
                });
        });
};