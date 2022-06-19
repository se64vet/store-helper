const Product =  require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

//--------------------------------------------------------
const createNewProduct = async (req, res) => {
  req.body.createdBy = req.user.userId
  const product = await Product.create(req.body)
  res.status(StatusCodes.CREATED).json({ product })
}

//--------------------------------------------------------
const getAllProducts = async (req, res) => {
  const {query} = req;
  let status = StatusCodes.OK;
  let products = Product.find({ createdBy: req.user.userId });
  
  //select
  if(query.select){
    const select = query.select.split(/[.,;\s_-]/);
    products.select(select.join(" "));
  }

  //sort
  query.sort ? products.sort(query.sort) : products.sort('createdAt');

  //limit products found
  if(query.limit){
    let limit = Number(query.limit);
    limit ? products.limit(limit) : products.limit(10);
  }

  //final return
  products.exec((error, result)=> {
    if(error){
      status = StatusCodes.NO_CONTENT;
    }
    res.status(status).json({ count: result.length, result })
  })
}

//--------------------------------------------------------
const getOneProduct = async (req, res) => {
  const {
    user: { userId },
    params: { id: productId },
  } = req

  const product = await Product.findOne({
    _id: productId,
    createdBy: userId,
  })
  if (!product) {
    throw new NotFoundError(`product ${jobId} was not found!`)
  }
  res.status(StatusCodes.OK).json({ product })
}

//--------------------------------------------------------
const updateOneProduct = async (req, res) => {
  const {
    body: {  price, name },
    user: { userId },
    params: { id: productId },
  } = req

  if (price === '' || name === '') {
    throw new BadRequestError('Please fill all fields before submit!')
  }
  const product = await Product.findByIdAndUpdate(
    { _id: productId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  )
  if (!product) {
    throw new NotFoundError(`No product ${productId} updated! because not found`)
  }
  res.status(StatusCodes.OK).json({ product })
}


//--------------------------------------------------------
const deleteOneProduct = async (req, res) => {
  const {
    user: { userId },
    params: { id: productId },
  } = req

  const product = await Product.findByIdAndRemove({
    _id: productId,
    createdBy: userId,
  })
  if (!product) {
    throw new NotFoundError(`product ${productId} is not found!`)
  }
  res.status(StatusCodes.OK).send()
}

//--------------------------------------------------------
const deleteAllProduct = async (req, res) => {
  const {userId} = req.user;
  const product = await Product.remove({createdBy: userId})
  res.status(StatusCodes.OK).json({product})
}

module.exports = {
  createNewProduct,
  getAllProducts,
  getOneProduct,
  updateOneProduct,
  deleteOneProduct,
  deleteAllProduct
}
