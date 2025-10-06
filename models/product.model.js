
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Product name is required'],
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    stock_quantity: { 
        type: Number, 
        required: true, 
        min: [0, 'Stock quantity cannot be less than 0'],
        default: 0
    },
    low_stock_threshold: {
        type: Number,
        default: 10,
        min: [0, 'Low stock threshold cannot be less than 0']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);