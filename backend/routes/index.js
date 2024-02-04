const express=require("express");
const{userRouter} =require("./userRoute");
const { accountRouter } = require("./accounts");
const { authMiddleware } = require("../middlewares/authentication");
const router=express.Router();

router.use('/user',userRouter);

router.use('/account',authMiddleware,accountRouter)

router.get('/',(req,res)=>{
    res.json({msg:"hello from server"});
})


module.exports={rootRouter:router};