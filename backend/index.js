require("dotenv").config();
const express = require("express");
const { connectToDb } = require("./db");
const{rootRouter} =require("./routes/index")
const cors=require("cors")
const app=express();

connectToDb(process.env.Mongo_URL)

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({extended:true}))

//Route
app.use('/api',rootRouter);

app.use((err,req,res,next)=> console.log(err));

app.listen(process.env.PORT,()=>console.log(`Server running at port ${process.env.PORT}`))

