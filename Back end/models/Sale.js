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

}, {timestamps})

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
module.exports = mongoose.model('Sale', SaleSchema)