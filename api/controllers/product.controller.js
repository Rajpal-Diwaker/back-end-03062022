const productSchema = require('../models/product.model');

exports.getAllproducts = async(req,res) =>{
    try {
        const products = await productSchema.find();
        if(!products){
            return res.status(400).json({msg:'product Collection empty'})
        }
        // products.forEach(async (el) => {
            
        //     const role = await roleSchema.findById(el.role[0])
           
        //     el.role[1] = role.roleName 
        //     console.log(role)
        // })
        // console.log(products)
        return res.status(200).send({products})
    } catch (error) {
        return res.status(500).send({err:error})
    }
}
exports.addproduct = async(req,res) =>{
    const {title} = req.body
    try {
        const productExist = await productSchema.findOne({title:title});
        if(productExist){
            return res.status(400).send({msg:'product exist'})
        }
        const newproduct = new productSchema(req.body);
        await newproduct.save();
        return res.status(201).send({msg:'Added successfully',newproduct})
    } catch (error) {
        return res.status(500).send({err:error})
    }
}

exports.updateproduct = async(req,res) =>{
    const {id} = req.params
    try {
        
        const products = await productSchema.findByIdAndUpdate(id,{$set:{...req.body}});
        if(!products){
            return res.status(400).json({msg:'product not exist'})
        }
        // products.forEach(async (el) => {
            
        //     const role = await roleSchema.findById(el.role[0])
           
        //     el.role[1] = role.roleName 
        //     console.log(role)
        // })
        // console.log(products)
        return res.status(200).send({msg:'product updated'})
    } catch (error) {
        return res.status(500).send({err:error})
    }
}

exports.getOneproduct = async(req,res) =>{
    const {id} = req.params
    try {
        const product = await productSchema.findById(id);
        if(!product){
            return res.status(400).json({msg:'product not exist'})
        }
        // products.forEach(async (el) => {
            
        //     const role = await roleSchema.findById(el.role[0])
           
        //     el.role[1] = role.roleName 
        //     console.log(role)
        // })
        // console.log(products)
        return res.status(200).send({product})
    } catch (error) {
        return res.status(500).send({err:error})
    }
}

exports.deleteOneproduct = async(req,res) =>{
    const {id} = req.params
    try {
        const productDeleted = await productSchema.findByIdAndDelete(id);
        if(!productDeleted){
            return res.status(400).json({msg:'product not exist'})
        }
       
        // products.forEach(async (el) => {
            
        //     const role = await roleSchema.findById(el.role[0])
           
        //     el.role[1] = role.roleName 
        //     console.log(role)
        // })
        // console.log(products)
        return res.status(200).send({msg:'product Deleted'})
    } catch (error) {
        return res.status(500).send({err:error})
    }
}