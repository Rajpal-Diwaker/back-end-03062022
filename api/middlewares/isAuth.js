
const jwt = require('jsonwebtoken')
const userSchema = require('../models/user.model')
exports.isAuth = async(req,res,next) =>{
    const token = req.header('Authorization');
    try {
        if(!token){
            return res.status(400).send({msg:'You don\'t have access'})
        }
        const decode = jwt.verify(token,process.env.tokenPassword);
        if(!decode){
            return res.status(400).send({msg:'You don\'t have access'})
        }
        const user = await userSchema.findById(decode.id);
        if(!user){
            return res.status(400).send({msg:'user not exist'})
        }
        req.user = user;
        next()
    } catch (error) {
        return res.status(400).send({msg:'You don\'t have access'})
    }
}