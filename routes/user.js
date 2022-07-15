const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/user');
const { body, param } = require('express-validator');

router.get('/:usrname', contactsController.getSingle);

router.post('/', 
            body('email').isEmail(), 
            body('password').isStrongPassword({minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1}).withMessage("Password must contain at least 8 characters with at least one uppercase, one lowercase, one symbol, and a number."),
            contactsController.createUser);

router.delete('/:id', 
            param('id').isLength({min:24, max:24}),
            contactsController.deleteUser);

module.exports = router;