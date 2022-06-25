const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/receipt');

router.get('/:usrId', contactsController.getAll);

router.get('/:recptId', contactsController.getSingle);

router.get('/:date1/:date2', contactsController.getTimeRange);

router.post('/', contactsController.createReceipt);

router.delete('/:recptId', contactsController.deleteReceipt);

module.exports = router;