const JWT=require("jsonwebtoken");
const { JWT_Secret } = require("../config");

function createTokenForUser(user){
    const payload={
        userId:user._id
    }

    const token=JWT.sign(payload,JWT_Secret);
    return token;
}

function validateToken(token){
    const payload=JWT.verify(token,JWT_Secret);
    return payload;
}

module.exports={
    createTokenForUser,
    validateToken
}