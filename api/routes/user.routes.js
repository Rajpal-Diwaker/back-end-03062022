const express = require('express');
const { getAllusers, addUser,getOneUser,deleteOneUser,updateUser } = require('../controllers/user.controller');
const { isAuth } = require('../middlewares/isAuth');
const {validatorRegister,validatorLogin,validation} = require('../middlewares/validator')
const userRouter = express.Router()


userRouter.get('/',isAuth,getAllusers);
userRouter.get('/current',isAuth,(req,res)=>res.send({user:req.user}))
userRouter.post('/add',validatorRegister,validation,addUser);
userRouter.get('/:id',getOneUser);
userRouter.delete('/:id',deleteOneUser);
userRouter.put('/:id',updateUser); 


module.exports = userRouter