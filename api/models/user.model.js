const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:[{type:mongoose.Schema.Types.ObjectId,ref:'Role'}],
    // createdAt:{type:Date,default:new Date()},
    // updatedUp:{type:Date,default:new Date()},
},{
    timestamps:true
})

module.exports = mongoose.model('User',userSchema)