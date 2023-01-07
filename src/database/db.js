const mongoose = require("mongoose");

mongoose.set('strictQuery', true);
const Connection=async(username,password)=>{
    const URL=`mongodb+srv://${username}:${password}@cluster0.2q2wy.mongodb.net/PepperCloudAssignmentDB`
    try{
       await mongoose.connect(URL,{useNewUrlParser:true})
       console.log("Database connected successfully.")

    }catch(error){
        console.log(`error while connecting database `, error.message);
    }
}

module.exports={Connection}