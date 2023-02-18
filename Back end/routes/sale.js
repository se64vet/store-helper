const express =  require('express');
const router =  express.Router();
const {
    getInvoices, createNewInvoice, 
    updateInvoice, deleteInvoice
} = require('../controllers/sale');

router.route('/').get(getInvoices).post(createNewInvoice);
router.route('/:id').patch(updateInvoice).delete(deleteInvoice)

module.exports = router