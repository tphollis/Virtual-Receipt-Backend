const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/user');

router.get('/:usrname', contactsController.getSingle);

router.post('/', contactsController.createUser);

router.delete('/:usrname', contactsController.deleteUser);

module.exports = router;