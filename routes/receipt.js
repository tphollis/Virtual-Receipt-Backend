const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const contactsController = require('../controllers/recepit');

router.get('/:usrId', contactsController.getAll);

router.get('/:recptId', contactsController.getSingle);

router.get('/:date1/:date2', contactsController.getTimeRange);

router.post('/', validator.recipt,contactsController.createReceipt);

router.delete('/:recptId', contactsController.deleteReceipt);

module.exports = router;