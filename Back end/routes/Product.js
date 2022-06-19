const express = require('express')

const router = express.Router()
const v1 = require('../controllers/Product')

router.route('/').post(v1.createNewProduct).get(v1.getAllProducts).delete(v1.deleteAllProduct)

router.route('/:id').get(v1.getOneProduct).delete(v1.deleteOneProduct).patch(v1.updateOneProduct)


module.exports = router
