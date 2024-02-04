const z=require("zod");

const signupBody=z.object({
    email:z.string().email(),
    fName:z.string().max(30),
    lName:z.string().max(30),
    password:z.string().min(6,{message:"Must be atleast 5 characters"})
})

const loginBody=z.object({
    email:z.string().email(),
    password:z.string().min(6,{message:"Must be atleast 5 characters"})
})

const updateBody=z.object({
    fName:z.string().max(30).optional(),
    lName:z.string().max(30).optional(),
    password:z.string().min(6,{message:"Must be atleast 5 characters"}).optional(),
    userId:z.string()
})

const transferBody=z.object({
    to:z.string(),
    amount:z.number().multipleOf(0.01).positive()
})

module.exports={
    signupBody,
    loginBody,
    updateBody,
    transferBody
}