const express = require("express"); //import express from 'express'

const app = express();
require("dotenv").config();
const connectDb = require('./config/connectDb');
const init = require("./config/setup");
const userRouter = require('./routes/user.routes');
const roleRouter = require('./routes/role.routes');
const productRouter = require('./routes/product.routes');
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.use('/user',userRouter);
app.use('/role',roleRouter);
app.use('/product',productRouter);
connectDb();
init()
app.listen(PORT, (err) => {
  if (err) throw console.error(err);
  console.log("listen to port " + PORT);
});
