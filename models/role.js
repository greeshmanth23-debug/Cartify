const mongoose = require('mongoose');
const roleschema = new mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,default:'user'}
})
const userrole=mongoose.model('role',roleschema);
module.exports=userrole;