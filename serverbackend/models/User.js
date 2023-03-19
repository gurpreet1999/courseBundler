import mongoose, { Schema } from "mongoose";
import validator from "validator";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import crypto from "crypto"

const schema=new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Please nter your name"],
        maxLength:[30,"Name caanot exceed 30character"]
        ,minLength:[4,"Atleast 4 character"]
    
    
    },
    email:{type:String,
        required:[true,"Please enter your email"]
        ,
        unique:true,
        validate:[validator.isEmail,"Please enter valid email"]
        
        
        },
        password:{
            type:String,
            required:[true,"Please enter your password"]
            ,minLength:[6,"Pasword must be at least 6 character"],
            select:false
            },
     role:{
     type:String,
      enum:["admin","user"],
       default:"user"
      },

        subscription:{
        id:String,
         status:String,
                    
      },
      avatar:
      {
      public_id:{
          type:String,
          required:true
      },
      url:{
          type:String,
          required:true 
      }
      },


      playlist:[
        {
            course:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"COURSE"
            },
            poster:String,

        }
      ],

createdAt:{
    type:Date,
    default:Date.now()
}
,



resetPasswordToken:String,
resetPasswordExpire:String,


})



schema.methods.getJWTtoken=function(){
    return jwt.sign({_id:this._id},process.env.JWTSECRET,{
        expiresIn:"15d",
        
    })
}

schema.pre("save",async  function(next){

if(!this.isModified("password")){
    return next()
}

 const hashedPassword= await bcrypt.hash(this.password,10,)
this.password=hashedPassword
next()
})


schema.methods.comparePassword= async function(password){
   console.log(this.password)
return await bcrypt.compare(password,this.password)

}


schema.methods.getResetToken=function(){

const resettoken=crypto.randomBytes(20).toString("hex")

this.resetPasswordToken= crypto.createHash("sha256").update(resettoken).digest("hex")
this.resetPasswordExpire=Date.now() +15*60*1000
return resettoken



}


export const USER=mongoose.model("USER",schema)