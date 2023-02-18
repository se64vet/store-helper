const mongoose = require('mongoose')

const MonthSaleSchema = new mongoose.Schema({
    month: {
        type: String,
        required: [true, "please provide month for the bill"]
    },
    totalSale: {
        type: Number,
        required: [true, "please provide total sale for this month"],
    },
    tax:{
        type: Number,
        default: 0.9
    },
    totalFees: {
        type: Number,
        default: (this.totalSale * 0.3)
    }

}, {timestamps: true})

const YearSaleSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: [true, 'year sale is missing!']
    }, 
    sale: [MonthSaleSchema]
})

const SaleSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },
    sales: {
        type: [YearSaleSchema],
        default: []
    }

})

const BillSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: [true, "missing total amount of bill"]
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        required: [true, 'missing status'],
        default: 'pending'
    },
    items: {
        type: [{_id: false, item: {type: mongoose.Types.ObjectId, ref: "Product"}, qty: {type: Number, default: 1}}],
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },
}, {timestamps: true})
module.exports = mongoose.model('Sale', SaleSchema)
module.exports = mongoose.model('Invoice', BillSchema)