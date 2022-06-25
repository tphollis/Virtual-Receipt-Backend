const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/user');

router.get('/:username', contactsController.getSingle);

router.post('/', contactsController.createUser);

router.delete('/:username', contactsController.deleteUser);

module.exports = router;