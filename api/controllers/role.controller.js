const roleSchema = require('../models/role.model');

exports.getAllroles = async(req,res) =>{
    try {
        const roles = await roleSchema.find();
        if(!roles){
            return res.status(400).json({msg:'role Collection empty'})
        }
        // roles.forEach(async (el) => {
            
        //     const role = await roleSchema.findById(el.role[0])
           
        //     el.role[1] = role.roleName 
        //     console.log(role)
        // })
        // console.log(roles)
        return res.status(200).send({roles})
    } catch (error) {
        return res.status(500).send({err:error})
    }
}
exports.addrole = async(req,res) =>{
    const {roleName} = req.body
    try {
        const roleExist = await roleSchema.findOne({roleName:roleName});
        if(roleExist){
            return res.status(400).send({msg:'role exist'})
        }
        const newrole = new roleSchema(req.body);
        await newrole.save();
        return res.status(201).send({msg:'Added successfully',newrole})
    } catch (error) {
        return res.status(500).send({err:error})
    }
}

exports.updaterole = async(req,res) =>{
    const {id} = req.params
    try {
        const roles = await roleSchema.findByIdAndUpdate(id,{$set:{...req.body}});
        if(!roles){
            return res.status(400).json({msg:'role not exist'})
        }
        // roles.forEach(async (el) => {
            
        //     const role = await roleSchema.findById(el.role[0])
           
        //     el.role[1] = role.roleName 
        //     console.log(role)
        // })
        // console.log(roles)
        return res.status(200).send({msg:'role updated'})
    } catch (error) {
        return res.status(500).send({err:error})
    }
}

exports.getOnerole = async(req,res) =>{
    const {id} = req.params
    try {
        const role = await roleSchema.findById(id);
        if(!role){
            return res.status(400).json({msg:'role not exist'})
        }
        // roles.forEach(async (el) => {
            
        //     const role = await roleSchema.findById(el.role[0])
           
        //     el.role[1] = role.roleName 
        //     console.log(role)
        // })
        // console.log(roles)
        return res.status(200).send({role})
    } catch (error) {
        return res.status(500).send({err:error})
    }
}

exports.deleteOnerole = async(req,res) =>{
    const {id} = req.params
    try {
        const roleDeleted = await roleSchema.findByIdAndDelete(id);
        if(!roleDeleted){
            return res.status(400).json({msg:'role not exist'})
        }
       
        // roles.forEach(async (el) => {
            
        //     const role = await roleSchema.findById(el.role[0])
           
        //     el.role[1] = role.roleName 
        //     console.log(role)
        // })
        // console.log(roles)
        return res.status(200).send({msg:'role Deleted'})
    } catch (error) {
        return res.status(500).send({err:error})
    }
}