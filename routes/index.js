var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { navLocation: 'main' });
});

const AuthController = require('../controllers/authController');
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);
router.get('/error', function(req, res, next) {
  res.render('pages/error', { navLocation: '' });
});
router.get('/error404', function(req, res, next) {
  res.render('pages/error404', { navLocation: '' });
});

module.exports = router;
