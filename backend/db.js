const mongoose=require("mongoose")
function connectToDb(url){
    mongoose.connect(url)
    .then(console.log("MongoDB Connected"));
}

module.exports={
    connectToDb
}