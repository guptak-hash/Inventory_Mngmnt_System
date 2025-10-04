const express=require('express');
const  mongoose  = require('mongoose');
const productRouter = require('./routes/product.routes');
require('dotenv').config()

const app=express();

app.use(express.json());

app.use('/product',productRouter);

mongoose.connect(`${process.env.MONGO_URI}/inventory`)
.then(()=>app.listen(process.env.PORT,()=>{
    console.log('Server started')
})).catch(err=>console.log(err))