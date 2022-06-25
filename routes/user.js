const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const contactsController = require('../controllers/user');

router.get('/:username', contactsController.getSingle);

router.post('/', contactsController.createUser);

router.delete('/:username', contactsController.deleteitems);

module.exports = router;