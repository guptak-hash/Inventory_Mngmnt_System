
const express = require('express');
const { 
    addProduct, 
    getProductById, 
    getAllProducts, 
    updateProductById, 
    deleteProductById, 
    decStockQty, 
    incStockQty,
    getLowStockProducts 
} = require('../controllers/product.controller');

const productRouter = express.Router();

// Product CRUD operations
productRouter.post('/', addProduct);
productRouter.get('/', getAllProducts);
productRouter.get('/low-stock', getLowStockProducts); // Bonus feature
productRouter.get('/:id', getProductById);
productRouter.patch('/:id', updateProductById);
productRouter.delete('/:id', deleteProductById);

// Stock management operations
productRouter.patch('/:id/increase-stock', incStockQty);
productRouter.patch('/:id/decrease-stock', decStockQty);

module.exports = productRouter;