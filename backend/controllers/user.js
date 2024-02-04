const { Account } = require("../models/Accounts");
const { createTokenForUser, validateToken } = require("../services/auth");
const { signupBody, loginBody, updateBody } = require("../types");
const User=require("../models/user").User;

async function handleUserStatus(req,res){
    const token=req.body.token;
    if(token==null){
        return res.status(500).json({msg:"1"})
    }

    try {
        const payload= validateToken(token);
        if(payload==null){
            return res.status(500).json({msg:"1"})
        }

        const user= await User.findOne({_id:payload.userId});

        const result={
            userId:user._id,
            fName:user.firstName
        }
            return res.status(200).json({result})
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg:"1" });
    }
}

async function handleUserSignup(req,res){
    const userbody=req.body;

    const parsedPayload=signupBody.safeParse(userbody);

    if(!parsedPayload.success){
        console.log(parsedPayload.error);
        res.status(411).json({msg:`Wrong input.`})
        return;
    }

    try {
        const existingUser=await User.findOne({email:userbody.email});
        if(existingUser){
            return res.status(411).json({msg:"Email already taken."})
        }

        const newUser = new User({
            email: userbody.email,
            firstName: userbody.fName,
            lastName: userbody.lName
        });

        const hashedPassword=await newUser.createHash(userbody.password);

        newUser.password=hashedPassword;

        await newUser.save();

        const token= createTokenForUser(newUser);
        let num=Math.floor(Math.random()*10000);

        await Account.create({
            userId:newUser._id,
            balance:num*100
        })

        return res.status(201).json({   
            msg:"User created successfully.",
            token:`${token}`
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg:"Server not working" });
    }
}


async function handleUserLogin(req,res){
    const userBody=req.body;
    const parsedPayload=loginBody.safeParse(userBody);

    if(!parsedPayload.success){
        console.log(parsedPayload.error);
        return res.status(411).json({msg:`Wrong inputs.`})
    }

    try {
        const user=await User.findOne({email:userBody.email});

        if(user==null){
            return res.status(400).json({
                msg: "User not found."
            })
        }
        else{
            if (await user.validatePassword(userBody.password)) {
                
                const token= createTokenForUser(user);

                return res.status(200).json({
                  message: "User Successfully Logged In",
                  token:`${token}`
                });
              } else {
                return res.status(400).json({
                  message: "Incorrect Password",
                });
              }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg:"Server error" });
    }
}

async function handleUserUpdate(req,res){
    const userBody=req.body;
    const parsedPayload=updateBody.safeParse(userBody);

    if(!parsedPayload.success){
        return res.json({msg:"Error while updating information"})
    }
    
    try {
        const user= await User.findOne({_id:userBody.userId});

        if(userBody.password){
            const hashedPassword=await user.createHash(userBody.password);
            userBody.password=hashedPassword;
        }

        await User.findByIdAndUpdate(
            userBody.userId,
            req.body,
            { new: true, runValidators: true }
        )

        res.status(200).json({msg:"Updated successfully"});
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg:"Server Error"});
    }
}

async function handleUserRetrieval(req,res){
    const name=req.query.filter|| "";

    try {
        const users= await User.find(
            { $or:[ {
                "firstName":{
                    "$regex":name
                }
            }, 
            {"lastName":{
                "$regex":name
                }
            } 
        ]}
        );
    
        res.status(200).json({
            users:users.map((user)=>({
                email:user.email,
                firstName:user.firstName,
                lastName:user.lastName,
                userId:user._id
            })
            )
            
        });
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg:"Server Error"});
    }
}


module.exports={
    handleUserSignup,
    handleUserLogin,
    handleUserUpdate,
    handleUserRetrieval,
    handleUserStatus
}