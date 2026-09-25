const mongoose=require('mongoose');
const cartschema=new mongoose.Schema({
    email:{type:String},
    productid:{type:String}
});
const cart=new mongoose.model('cart',cartschema);
module.exports=cart;
