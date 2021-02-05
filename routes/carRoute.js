const express = require('express');
const router = express.Router();
const carControler = require('../controllers/carController');
const authUtils = require('../util/authUtil');

router.get('/', carControler.showCarList);
router.get('/add', authUtils.permitAuthenticatedUser,carControler.showAddCarForm);
router.get('/edit/:carId', authUtils.permitAuthenticatedUser,carControler.showEditCarForm);
router.get('/details/:carId', authUtils.permitAuthenticatedUser,carControler.showCarDetails);
router.post('/add', authUtils.permitAuthenticatedUser,carControler.addCar); 
router.post('/edit', authUtils.permitAuthenticatedUser,carControler.updateCar);
router.get('/delete/:carId', authUtils.permitAuthenticatedUser,carControler.deleteCar);
module.exports = router;