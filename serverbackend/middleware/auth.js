import  jwt from "jsonwebtoken"
import errorHandler from "../utils/errorHandler.js"
  import {CatchasyncError} from "../middleware/CatchasyncError.js"
  import {USER} from "../models/User.js"
  


  export const isAuthenticatedUser=CatchasyncError(
    async(req,res,next)=>{
    const {token}=req.cookies;
console.log(req.cookies)
if(!token){
    return next(new errorHandler("please login to accss this resource",401))//yaha error pass kiya to woh sdamaj jayega ki error wala middlwrae me jaba he ..kyunki woh wala middleare ka pehla paarameter hi err he..so isse nodejs pta laga eta he ki woh error middleware he
}

const decodedata=jwt.verify(token,process.env.JWTSECRET)

req.user=await USER.findById(decodedata._id)

next()

    })


    export const authorizeAdmin=(req,res,next)=>{

if(req.user.role!=="admin"){
  return next(new errorHandler("only admin is allowed to access to this resource",401))//yaha error pass kiya to woh sdamaj jayega ki error wala middlwrae me jaba he ..kyunki woh wala middleare ka pehla paarameter hi err he..so isse nodejs pta laga eta he ki woh error middleware he
}
next()

    }
  
      
  
  

    export const authorizeSubscribers=(req,res,next)=>{

      if(req.user.subscription.status!=="active" && req.user.role!=="admin"  ){
        return next(new errorHandler("only subscribers can to access to this resource",401))//yaha error pass kiya to woh sdamaj jayega ki error wala middlwrae me jaba he ..kyunki woh wala middleare ka pehla paarameter hi err he..so isse nodejs pta laga eta he ki woh error middleware he
      }
      next()
      
          }
        
            




   
