const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    description:String,
    stock_quantity:{type:Number,required:true},
})

const ProductModel=mongoose.model('product',productSchema);

module.exports = ProductModel;