import app from "./app.js";
import {connectDB} from "./config/Database.js"
import cloudinary from "cloudinary"
import Razorpay from "razorpay"

import  nodeCron from "node-cron"
import { STATS } from "./models/Stats.js";

connectDB()


cloudinary.v2.config({
    cloud_name:"gurpreetcloud",
    api_key:"994636538226325" ,
    api_secret:"40Ei7-gvQpa8Wm8PK4kh0pwnKiE"
})



nodeCron.schedule("0 0 0 1 * *  ",async()=>{
   try{
await STATS.create({})

   }
   catch(error){
console.log(error)
   }
})







export const instance=new Razorpay({
    key_id:"rzp_test_3o6r2zMmGiQeyp",
    key_secret:"PIg74Uq8UZdThKxQhJq6QvNA"
})









app.listen(process.env.PORT,()=>{
    console.log("server is running")
})