const express = require('express');
const { getAllproducts, addproduct,getOneproduct,deleteOneproduct,updateproduct } = require('../controllers/product.controller');

const productRouter = express.Router()


productRouter.get('/',getAllproducts);
productRouter.post('/add',addproduct);
productRouter.get('/:id',getOneproduct);
productRouter.delete('/:id',deleteOneproduct);
productRouter.put('/:id',updateproduct);


module.exports = productRouter