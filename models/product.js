const mongoose=require('mongoose');
const schema= new mongoose.Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    discription:{type:String,required:true},
    quantity:{type:Number,required:true},
    category:{type:String,required:true},
    image:{type:String,required:true}
})
const productdata=new mongoose.model('product',schema);
module.exports=productdata;