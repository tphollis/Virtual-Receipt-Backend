const express = require('express');
const router = express.Router();
const validator = require('../utils/middleware.js')

const contactsController = require('../controllers/items');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', validator.recipt,contactsController.createitems);

router.put('/:id', validator.recipt, contactsController.updateitems);

router.delete('/:id', contactsController.deleteitems);

module.exports = router;