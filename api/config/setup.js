const userSchema = require("../models/user.model");
const roleSchema = require("../models/role.model");
const productSchema = require("../models/product.model");
const bcrypt = require("bcrypt");
const {data} = require('./data')

const init = async () => {
  try {
    [{roleName:'admin'},{roleName:'gestionnaire'},{roleName:'user'}].map(async(el)=>{
        const role = await roleSchema.findOne(el)
        if(!role){
            await roleSchema.insertMany([el]);
            console.log(`${el.roleName} added successfully`);
        }
    })
      const productExist = await productSchema.find();
      if(productExist.length == 0){ 
        await productSchema.insertMany(data);
        console.log('product added successfully')
      }
      
        

        const isAdmin = await roleSchema.findOne({roleName:'admin'});
        if(!isAdmin){
            [{roleName:'admin'},{roleName:'gestionnaire'},{roleName:'user'}].map(async(el)=>{
                const role = await roleSchema.findOne(el)
                if(!role){
                    await roleSchema.insertMany([el]);
                    console.log(`${el.roleName} added successfully`);
                }
            }) 
        }
        const userIsAdmin = await userSchema.findOne({role:isAdmin._id})
        if(!userIsAdmin){
            const newAdmin = new userSchema({
                firstname:'admin',
                lastname:'admin',
                email:'admin@admin.com',
                password:bcrypt.hashSync('123456789',10),
                role:[isAdmin._id]
            })
            await newAdmin.save();
            console.log('admin created')
        }
        
  } catch (error) {
    console.error(error)
  }
};

module.exports = init