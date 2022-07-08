const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/receipt');

router.get('/:usrId', contactsController.getAll);

router.get('/find/:usrId&:field&:value', contactsController.getSpecific);

router.get('/range/:usrId&:date1&:date2', contactsController.getTimeRange);

router.post('/', contactsController.createReceipt);

router.put('/:id', contactsController.updateReceipt);

router.delete('/:recptId', contactsController.deleteReceipt);

module.exports = router;