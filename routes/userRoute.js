const express = require('express');
const router = express.Router();
const userControler = require('../controllers/userController');
const authUtils = require('../util/authUtil');

router.get('/', userControler.showAddUserForm);
router.get('/users', authUtils.permitAuthenticatedUser, userControler.showUsers);
router.get('/user/edit/:userId', authUtils.permitAuthenticatedUser, userControler.showEditUserForm);
router.get('/user/details/:userId', authUtils.permitAuthenticatedUser, userControler.showUserDetails);
router.post('/', userControler.addUser); 
router.post('/user/edit', authUtils.permitAuthenticatedUser, userControler.updateUser);
router.get('/user/delete/:userId', authUtils.permitAuthenticatedUser, userControler.deleteUser);
module.exports = router;