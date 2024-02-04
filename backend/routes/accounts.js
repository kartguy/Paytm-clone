const express=require("express");
const { handleAccountTransfer, handleGetBalance } = require("../controllers/account");
const { authMiddleware } = require("../middlewares/authentication");
const router=express();

router.get('/balance',handleGetBalance);

router.post('/transfer',handleAccountTransfer)

module.exports={
    accountRouter:router
}