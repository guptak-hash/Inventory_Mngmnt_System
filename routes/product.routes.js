const express = require('express');
const ProductModel = require('../models/product.model');
const { addProduct, getProductById, getAllProducts, updateProductById, deleteProductById, decStockQty, incStockQty, } = require('../controllers/product.controller');

const productRouter = express.Router();

// create product
productRouter.post('/', addProduct);

// read product, get all products
productRouter.get('/',getAllProducts);

// get product by id
productRouter.get('/:id',getProductById);

// update product
productRouter.patch('/:id',updateProductById);

// delete product
productRouter.delete('/:id',deleteProductById);

// decrease stock quantity
productRouter.get('/decrease/:id',decStockQty);

// increase stock quantity
productRouter.get('/increase/:id',incStockQty);

module.exports = productRouter;