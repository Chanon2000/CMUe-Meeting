const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
// console.log(authController)
// console.log(userController)
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

// router.post('/', authController.protect, userController.create);
router.get('/', userController.getUser);
router.get('/:id', userController.getUserById);
router.delete('/:id', userController.deleteUser);

module.exports = router;
