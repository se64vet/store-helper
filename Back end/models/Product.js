const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
  {
    name : {
      type: String,
      required: [true, 'Product name is missing!'],
      maxlength: 50,
    },
    category: {
      type: String,
      default: "general"
    },
    price: {
      type: Number,
      required: [true, 'Price is missing!'],
    },
    sold: {
      type: Number,
      default: 0,
    },
    img: {
      type: [Object],
      default: [{thumbnail: 'https://via.placeholder.com/150'}],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Product', ProductSchema)
