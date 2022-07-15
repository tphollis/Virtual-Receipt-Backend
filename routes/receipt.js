const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/receipt');
const { body, param } = require('express-validator');

router.get('/:usrId',
            param('usrId').isLength({min:24, max:24}),
            contactsController.getAll);

router.get('/find/:usrId&:field&:value',
            param('usrId').isLength({min:24, max:24}),
            param('field').isIn(['date', 'total', 'store', 'city', 'state', 'purchase_type']).withMessage('field contains an invalid value'),
            contactsController.getSpecific);

router.get('/range/:usrId&:date1&:date2',
            param('usrId').isLength({min:24, max:24}),
            contactsController.getTimeRange);

router.post('/',
            body('user_id').isLength({min:24, max:24}),
            contactsController.createReceipt);

router.put('/:id',
            param('usrId').isLength({min:24, max:24}),
            contactsController.updateReceipt);

router.delete('/:recptId',
            param('recptId').isLength({min:24, max:24}), 
            contactsController.deleteReceipt);

module.exports = router;