import mongoose from "mongoose";

export const connectDB=  async  ()=>{


 const {connection}=await    mongoose.connect(process.env.MONGOURL,{
    dbName:"courseforstudent"
 })

 console.log("mongo db connected")
}