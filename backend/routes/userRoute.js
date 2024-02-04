const express=require("express");
const router=express.Router();
const { authMiddleware } = require("../middlewares/authentication");
const { handleUserSignup, 
    handleUserLogin, 
    handleUserUpdate,
    handleUserRetrieval,
    handleUserStatus 
} = require("../controllers/user");


router.post('/signup',handleUserSignup);
router.post('/login',handleUserLogin);
router.put('/update',authMiddleware,handleUserUpdate);
router.get('/bulk',handleUserRetrieval);

router.post('/me',handleUserStatus)

module.exports= {userRouter:router};