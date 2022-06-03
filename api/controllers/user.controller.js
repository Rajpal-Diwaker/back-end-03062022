const userSchema = require('../models/user.model');
const bcrypt = require('bcrypt');
const roleSchema = require('../models/role.model');
const jwt = require('jsonwebtoken')
exports.getAllusers = async(req,res) =>{
    try {
        const users = await userSchema.find();
        if(!users){
            return res.status(400).json({msg:'User Collection empty'})
        }
        // users.forEach(async (el) => {
            
        //     const role = await roleSchema.findById(el.role[0])
           
        //     el.role[1] = role.roleName 
        //     console.log(role)
        // })
        // console.log(users)
        return res.status(200).send({users})
    } catch (error) {
        return res.status(500).send({err:error})
    }
}
exports.addUser = async(req,res) =>{
    const {email,password} = req.body
    try {
        const userExist = await userSchema.findOne({email:email});
       
        if(userExist){
            return res.status(400).send({msg:'User exist'})
        }
        const newUser = new userSchema(req.body);
        const passwordHashed = bcrypt.hashSync(password,10)
        newUser.password = passwordHashed;
        const userRole = await roleSchema.findOne({roleName:'user'});
        newUser.role = [userRole._id]
        const token = jwt.sign({id:newUser._id},process.env.tokenPassword)
        await newUser.save(); 
        return res.status(201).send({msg:'Added successfully',token})
    } catch (error) {
        return res.status(500).send({err:error})
    }
}

exports.updateUser = async(req,res) =>{
    const {id} = req.params
    try {
        if(req.body.password){
            req.body.password = bcrypt.hashSync(req.body.password,10)
        }
        const users = await userSchema.findByIdAndUpdate(id,{$set:{...req.body}});
        if(!users){
            return res.status(400).json({msg:'User not exist'})
        }
        // users.forEach(async (el) => {
            
        //     const role = await roleSchema.findById(el.role[0])
           
        //     el.role[1] = role.roleName 
        //     console.log(role)
        // })
        // console.log(users)
        return res.status(200).send({msg:'User updated'})
    } catch (error) {
        return res.status(500).send({err:error})
    }
}

exports.getOneUser = async(req,res) =>{
    const {id} = req.params
    try {
        const user = await userSchema.findById(id);
        if(!user){
            return res.status(400).json({msg:'User not exist'})
        }
        // users.forEach(async (el) => {
            
        //     const role = await roleSchema.findById(el.role[0])
           
        //     el.role[1] = role.roleName 
        //     console.log(role)
        // })
        // console.log(users)
        return res.status(200).send({user})
    } catch (error) {
        return res.status(500).send({err:error})
    }
}

exports.deleteOneUser = async(req,res) =>{
    const {id} = req.params
    try {
        const userDeleted = await userSchema.findByIdAndDelete(id);
        if(!userDeleted){
            return res.status(400).json({msg:'User not exist'})
        }
       
        // users.forEach(async (el) => {
            
        //     const role = await roleSchema.findById(el.role[0])
           
        //     el.role[1] = role.roleName 
        //     console.log(role)
        // })
        // console.log(users)
        return res.status(200).send({msg:'User Deleted'})
    } catch (error) {
        return res.status(500).send({err:error})
    }
}