
const ProductModel = require("../models/product.model");

// Add new product
const addProduct = async (req, res) => {
    try {
        const product = await ProductModel.create(req.body);
        res.status(201).json({ 
            success: true,
            message: 'Product created successfully', 
            data: product 
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ 
                success: false,
                message: 'Validation error'
            });
        }
        if (err.code === 11000) {
            return res.status(400).json({ 
                success: false,
                message: 'Product name already exists'
            });
        }
        res.status(500).json({ 
            success: false,
            message: 'Server error occurred' 
        });
    }
}

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.status(200).json({ 
            success: true,
            message: 'Products retrieved successfully', 
            data: products,
            count: products.length
        });
    } catch (err) {
        res.status(500).json({ 
            success: false,
            message: 'Server error occurred' 
        });
    }
}

// Get product by ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ 
                success: false,
                message: 'Invalid product ID format'
            });
        }

        const product = await ProductModel.findById(id);
        
        if (!product) {
            return res.status(404).json({ 
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({ 
            success: true,
            message: 'Product retrieved successfully', 
            data: product 
        });
    } catch (err) {
        res.status(500).json({ 
            success: false,
            message: 'Server error occurred' 
        });
    }
}

// Update product
const updateProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        // Prevent stock_quantity from going below zero
        if (updateData.stock_quantity !== undefined && updateData.stock_quantity < 0) {
            return res.status(400).json({ 
                success: false,
                message: 'Stock quantity cannot be less than 0'
            });
        }

        const product = await ProductModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ 
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({ 
            success: true,
            message: 'Product updated successfully', 
            data: product 
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ 
                success: false,
                message: 'Validation error'
            });
        }
        res.status(500).json({ 
            success: false,
            message: 'Server error occurred' 
        });
    }
}

// Delete product
const deleteProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findByIdAndDelete(id);
        
        if (!product) {
            return res.status(404).json({ 
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({ 
            success: true,
            message: 'Product deleted successfully', 
            data: product 
        });
    } catch (err) {
        res.status(500).json({ 
            success: false,
            message: 'Server error occurred' 
        });
    }
}

// Increase stock quantity
const incStockQty = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity = 1 } = req.body;

        if (quantity <= 0) {
            return res.status(400).json({ 
                success: false,
                message: 'Quantity must be greater than 0'
            });
        }

        const product = await ProductModel.findByIdAndUpdate(
            id,
            { $inc: { stock_quantity: quantity } },
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ 
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({ 
            success: true,
            message: `Stock quantity increased by ${quantity}`,
            data: product 
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ 
                success: false,
                message: 'Stock quantity cannot be less than 0'
            });
        }
        res.status(500).json({ 
            success: false,
            message: 'Server error occurred' 
        });
    }
}

// Decrease stock quantity
const decStockQty = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity = 1 } = req.body;

        if (quantity <= 0) {
            return res.status(400).json({ 
                success: false,
                message: 'Quantity must be greater than 0'
            });
        }

        const product = await ProductModel.findById(id);
        
        if (!product) {
            return res.status(404).json({ 
                success: false,
                message: 'Product not found'
            });
        }

        if (product.stock_quantity < quantity) {
            return res.status(400).json({ 
                success: false,
                message: `Insufficient stock. Available: ${product.stock_quantity}, Requested: ${quantity}`
            });
        }

        product.stock_quantity -= quantity;
        await product.save();

        res.status(200).json({ 
            success: true,
            message: `Stock quantity decreased by ${quantity}`,
            data: product 
        });
    } catch (err) {
        res.status(500).json({ 
            success: false,
            message: 'Server error occurred' 
        });
    }
}

// Get low stock products
const getLowStockProducts = async (req, res) => {
    try {
        const products = await ProductModel.find({
            $expr: { $lt: ['$stock_quantity', '$low_stock_threshold'] }
        });

        res.status(200).json({ 
            success: true,
            message: 'Low stock products retrieved successfully',
            data: products,
            count: products.length
        });
    } catch (err) {
        res.status(500).json({ 
            success: false,
            message: 'Server error occurred' 
        });
    }
}

module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById,
    decStockQty,
    incStockQty,
    getLowStockProducts
};