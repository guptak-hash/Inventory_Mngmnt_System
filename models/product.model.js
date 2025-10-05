const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    description:String,
    stock_quantity: { 
        type: Number, 
        required: true, 
        min: [0, 'Stock quantity cannot be less than 0'] 
    },
})

const ProductModel=mongoose.model('product',productSchema);

module.exports = ProductModel;