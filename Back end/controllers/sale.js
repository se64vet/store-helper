const Invoice = require('../models/Sale')
const {statusCodes, StatusCodes} = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

// create new Invoice
const createNewInvoice = async (req, res) => {
    req.body.user = req.user.userId;
    // NEED: calc total amount base on list of items
    const newInvoice = await Invoice.create(req.body);
    res.status(StatusCodes.CREATED).json({newInvoice});
}

// update Invoice
const updateInvoice = async (req, res) => {
    const {
        body:{items, status, amount},
        user: {userId},
        params: {id: InvoiceId}
    } = req;
    
    // ntInvoice = Invoice that needed to change 
    let ntcInvoice = await Invoice.findOne({_id: InvoiceId, user: userId});
    
        // Invoice not found
    if (!ntcInvoice) {
        throw new NotFoundError(`Invoice was not found!`)
    }
        // throw error if no data sent 
    if((!items || items.length <= 0) && (!status)){
        throw new BadRequestError('empty item list and status. Must fill at least one');
    }
        // update only Invoice's status
    if((!items || items.length <=0) && (status !== "")){
        ntcInvoice.status = status;
    }
        // update only Invoice's item list
    if((!status) && (items && items.length > 0)){
        ntcInvoice.items = items;
        ntcInvoice.amount = amount;
    }
    if(status && (items && items.length > 0)){
        ntcInvoice.status = status;
        ntcInvoice.items = items;
        ntcInvoice.amount = amount;
    }
    // process update and return 
    await ntcInvoice.save();
    res.status(StatusCodes.OK).json({ntcInvoice});
}

// get Invoices 
const getInvoices = async (req, res) => {
    const {query} = req;
    let startDate, endDate;
    let limit = 10;

    if(query.page){ limit = 10*query.page}
    if(query.datePeriod){
        startDate = query.datePeriod.StartDate;
        endDate = query.datePeriod.endDate;
    }else{
        startDate = new Date(null);
        endDate = new Date();
    }

    try {
        let invoices = await Invoice.find({ 
            user: req.user.userId,
            createdAt: {
                $gte: startDate,
                $lte: endDate
            }
        }).sort('-createdAt').limit(limit)
        res.status(StatusCodes.OK).json({ count: invoices.length, invoices })
    } 
    catch (error) {
        res.status(StatusCodes.NO_CONTENT).json({er: error.message})
    }

   
}

// delete one Invoice
const deleteInvoice = async (req, res) => {
    const {
      user: { userId },
      params: { id: invoiceId },
    } = req
    // ntdInvoice = needs to deleted invoice
    const ntdInvoice = await Invoice.findByIdAndRemove({
      _id: invoiceId,
      user: userId,
    })
    if (!ntdInvoice) {
      throw new NotFoundError(`invoice not found!`)
    }
    res.status(StatusCodes.OK).send()
  }

  module.exports = {
    getInvoices,
    createNewInvoice,
    updateInvoice,
    deleteInvoice
  }