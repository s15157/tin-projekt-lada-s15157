const UserRepository = require('../repository/mysql2/UserRepository');

exports.showUsers = (req, res, next) => {
    UserRepository.getUser()
    .then(users => {
        res.render('pages/users/list', {
            users: users,
            navLocation: 'user',
            success: ''
        });
    });
    
}

exports.showAddUserForm = (req, res, next) => {
    res.render('pages/register', { 
        user: {},
        pageTitle: 'Rejestracja',
        formMode: 'createNew',
        btnLabel: 'Zarejestruj',
        formAction: '/register',
        navLocation: 'user',
        success: '',
        validationErrors: []
    });
}

exports.showEditUserForm = (req, res, next) => {
    const userId = req.params.userId;
    UserRepository.getUserById(userId)
        .then(user => {
            res.render('pages/users/form', {
                user: user,
                formMode: 'edit',
                pageTitle: 'Edycja użytkownika',
                btnLabel: 'Edytuj użytkownika',
                formAction: '/register/user/edit',
                navLocation: 'user',
                validationErrors: []
            });
        });
}

exports.showUserDetails = (req, res, next) => {
    const userId = req.params.userId;
    UserRepository.getUserById(userId)
        .then(user => {
            res.render('pages/users/form', {
                user: user,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły użytkownika',
                btnLabel: 'Edytuj użytkownika',
                formAction: '',
                navLocation: 'user',
                validationErrors: []
            });
        });
}

exports.addUser = (req, res, next) => {
    const userData = { ...req.body };
    UserRepository.createUser(userData)
        .then(result => {
            UserRepository.getUser()
                .then(users => {
                    res.render('pages/users/list', {
                        users: users,
                        navLocation: 'user',
                        success: 'Pomyślnie dodano użytkownika!'
                    });
    });
        }).catch(err => {
            res.render('pages/register', {
                user: userData,
                pageTitle: 'Rejestracja',
                formMode: 'createNew',
                btnLabel: 'Zarejestruj',
                formAction: '/register',
                navLocation: '',
                success: '',
                validationErrors: err.details
            });
        });
};

exports.updateUser = (req, res, next) => {
    const userId = req.body._id;
    const userData = { ...req.body };

    UserRepository.updateUser(userId, userData)
        .then(result => {
            UserRepository.getUser()
                .then(users => {
                    res.render('pages/users/list', {
                        users: users,
                        navLocation: 'user',
                        success: 'Zaktualizowano użytkownika!'
                    });
                });
    }).catch(err => {
        res.render('pages/users/form', {
            user: userData,
            pageTitle: 'Edycja użytkownika',
            formMode: 'edit',
            btnLabel: 'Edytuj użytkownika',
            formAction: '/register/user/edit',
            navLocation: 'user',
            validationErrors: err.details
        });
    });
};

exports.deleteUser = (req, res, next) => {
    const userId = req.params.userId;
    UserRepository.deleteUser(userId)
        .then(() => {
            UserRepository.getUser()
                .then(users => {
                    res.render('pages/users/list', {
                        users: users,
                        navLocation: 'user',
                        success: 'Usunięto użytkownika!'
                    });
                });
        });
};