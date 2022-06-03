const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    id:{type:Number,required:true,unique:true},
    title:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    category:{type:String,required:true},
    rating:{type:Object},
    image:{type:String}
},{
    timestamps:true
})

module.exports = mongoose.model('Product',productSchema)