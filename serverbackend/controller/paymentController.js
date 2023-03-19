import errorHandler from "../utils/errorHandler.js"
  import {CatchasyncError} from "../middleware/CatchasyncError.js"
import { USER } from "../models/User.js"
import { instance } from "../server.js"
import crypto from "crypto"
import { PAYMENT } from "../models/Payment.js"



export const buySubscription=CatchasyncError(async(req,res,next)=>{

const user=await USER.findById(req.user._id)

if(!user){
    return next(new errorHandler("user not found ",404))
}
if(user.role==="admin") return new next(errorHandler("admin cant buy subscription",400))


const plain_id="plan_JuJevKAcuZdtRO"



//  const subscription=  await  instance.subscriptions.create({
//  plain_id:plain_id,
//   customer_notify:1,
//   total_count:12,
// })




// user.subscription.id=subscription.id
// user.subscription.status=subscription.status
// await user.save()

res.status(201).json({
    success:true,
    message:"subscription created"
// subscription
    
})



})



export const paymentVerification=CatchasyncError(async(req,res,next)=>{

const {razorpay_signature,razorpay_payment_id,razorpay_subscription_id}=req.body

const user=await USER.findById(req.user._id)
const subscription_id=user.subscription._id
const generated_signature=crypto.createHmac("sha256","ok").update(razorpay_payment_id+"|"+subscription_id,"utf-8").digest("hex")



const isauthentic=generated_signature===razorpay_signature
if(!isauthentic) return res.redirect(`http://localhost:4000/api/v1/paymentfail`)

// database cpome here

await PAYMENT.create({
    razorpay_signature,
    razorpay_payment_id,
    razorpay_subscription_id
})

user.subscription.status="active"
await user.save()
res.redirect(`http://localhost:4000/api/v1/paymentsuccess?reference=${razorpay_payment_id}`)

})



export const getRazorpaykey=CatchasyncError(async(req,res,next)=>{





    res.status(200).json({
        success:true,
        key:"rzp_test_3o6r2zMmGiQeyp"
   
        
    })

})


export const cancelSubscription=CatchasyncError(async (req,res,next)=>{

    const user=await USER.findById(req.user._id)
const subscriptionId=user.subscription.id

let refund=false;

await instance.subscriptions.cancel(subscriptionId)


const paymennt=await PAYMENT.findOne({
    razorpay_subscription_id:subscriptionId
})

const gap=Date.now()-paymennt.createdAt

const refundtime=7*24*60*60*1000;

if(refundtime>gap){
    refund=true;
    await instance.payments.refund(paymennt.razorpay_payment_id)
}



await paymennt.remove()
user.subscription.id=undefined
user.subscription.status=undefined

await user.save()


    res.status(200).json({
        success:true,
        message:refund?"subscription cancel, you will recieve full refund within 7  days":"subscription cancel,no refund initiated as subscription was cancel after 7 days"
   
        
    })




})