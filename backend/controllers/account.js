const { default: mongoose } = require("mongoose");
const { Account } = require("../models/Accounts");
const { transferBody } = require("../types");

async function handleGetBalance(req,res){
    const id=req.body.userId;
    const ACbalance=await Account.findOne({userId:id});

    res.status(200).json({balance:ACbalance.balance/100});
}

async function handleAccountTransfer(req,res){
    
    try {
        const session = await mongoose.startSession();

        session.startTransaction();

        const accountBody=req.body;
        const parsedPayload=transferBody.safeParse(accountBody);

        if(!parsedPayload.success){
            await session.abortTransaction();
            return res.status(411).json({msg:"Wrong Input"})
        }

        const senderBankInfo = await Account.findOne({userId:accountBody.userId}).session(session);

        const receiverBankInfo= await Account.findOne({userId:accountBody.to}).session(session);

        if(!senderBankInfo){
            await session.abortTransaction();
            return res.status(400).json({msg:"Invalid User."})
        }

        if(!receiverBankInfo){
            await session.abortTransaction();
            return res.status(400).json({msg:"Invalid Account."})
        }

        if(senderBankInfo.balance<accountBody.amount*100){
            await session.abortTransaction();
            return res.status(400).json({msg:"Insufficient balance."})
        }


        await Account.updateOne({userId:accountBody.userId},{$inc:{balance:-accountBody.amount*100}}).session(session);
        await Account.updateOne ({userId:accountBody.to},{$inc:{balance:accountBody.amount*100}}).session(session);

        await session.commitTransaction();

        return res.json({msg:"Transfer Successful"})
        
    } 
    catch (error) {
        await session.abortTransaction();
        console.log(error);
        return res.status(500).json({ msg:"Something went wrong."});
    }
    
    
}

module.exports={
    handleAccountTransfer,
    handleGetBalance
}