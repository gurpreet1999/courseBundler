
  import {CatchasyncError} from "../middleware/CatchasyncError.js"
  import errorHandler from "../utils/errorHandler.js"

import {sendEmail} from "../utils/sendEmail.js"

import { STATS } from "../models/Stats.js"




export const contact=CatchasyncError(async(req,res,next)=>{

const {name,email,message}=req.body

if(!name ||  !email || !message){
    return next(new errorHandler("please enter all the field",400))
    
    }
const to=process.env.MYMAIL

const subject="contact form courseBundler"

const text=`I am ${name} and my Email is  ${email}. \n
${message}  `


await sendEmail(to,subject,text)

    res.status(201).json({
        success:true,
    message:"your message has been sent "
  
        
    })


})

export const courseRequest=CatchasyncError(async(req,res,next)=>{


    const {name,email,course}=req.body

    if(!name ||  !email || !course){
        return next(new errorHandler("please enter all the field",400))
        
        }
    const to=process.env.MYMAIL
    
    const subject="requesting for a course on  courseBundler"
    
    const text=`I am ${name} and my Email is  ${email}. \n
    ${course}  `
    
    
    await sendEmail(to,subject,text)
    
        res.status(201).json({
            success:true,
        message:"your Request has been sent "
      
            
        })
        
    })




export const dashboardStats=CatchasyncError(async(req,res,next)=>{

const stats=await STATS.find({}).sort({ createdAt:"desc"}).limit(12)

const statsdata=[]
const requireddata=12-statsdata.length

for(let i=0;i<stats.length;i++){

statsdata.push(stats[i])

}
    
for(let i=0;i<requireddata;i++){

    statsdata.unshift({
        users:0,
        subscriptions:0,
        views:0
    })
    
    }
        
       const userscount=statsdata[11].users
       const subscriptioncount=statsdata[11].subscriptions
       const viewscount=statsdata[11].views

let userprofit=true, viewprofit=true, subscriptionprofit=true
let userpercent=0, viewpercent=0, subscriptionpercent=0
if(statsdata[10].users===0) {
    userpercent=userscount*100
}
if(statsdata[10].views===0) {
    viewpercent=viewscount*100
}

if(statsdata[10].subscriptions===0) {
    subscriptionpercent=subscriptioncount*100
}

else{
    const differnce={
        users:statsdata[11].users-statsdata[10].users,
       views:statsdata[11]. views-statsdata[10]. views,
       subscriptions:statsdata[11]. subscriptions-statsdata[10]. subscriptions

    }


userpercent=(differnce.users/statsdata[10].users)*100
viewpercent=(differnce.views/statsdata[10].views)*100
subscriptionpercent=(differnce.subscriptions/statsdata[10].subscriptions)*100

if(userpercent<0){
    userprofit=false
}

if(viewpercent<0){
   viewprofit=false
}
if(subscriptionpercent<0){
    subscriptionprofit=false
}

}

    res.status(201).json({
        success:true,
        viewscount,
        subscriptioncount,
        userscount,
        stats:statsdata,
  subscriptionpercent,
  userpercent,
  viewpercent,
  subscriptionprofit,
  viewprofit,
  userprofit

        
    })


})