import {COURSE} from "../models/Course.js"
import errorHandler from "../utils/errorHandler.js"
  import {CatchasyncError} from "../middleware/CatchasyncError.js"
import getDataUri from "../utils/datauri.js";
import cloudinary from "cloudinary"
import { STATS } from "../models/Stats.js";

export const getallCousrse=CatchasyncError(

    async(req,res,next)=>{

        const courses= await COURSE.find().select("-lectures");
        res.status(200).json({
            success:true,
            courses
        })
        
        }

)


export const createcourse= CatchasyncError(
  async (req,res,next)=>{

const {title,description,category,createdby}=req.body

if(!title || !description || ! category || !createdby){
  return next(new errorHandler("please add all the filed ", 400)) // new Error("cant be done") // aisa nai kr sakte he ye wale class me sirf mesage hi pass kr sakte he..or ye wala class ka object jab err me catch hoga to sirf humaree opass mesage hi hoga 
}

 const file=req.file;

   const fileUri= getDataUri(file)
   console.log(fileUri.content)
   const myCloud=await cloudinary.v2.uploader.upload(fileUri.content)
console.log(myCloud)


      const course=await COURSE.create({
        title,description,category,createdby,
        poster:{public_id:myCloud.public_id,url:myCloud.url}
      });
      res.status(201).json({
          success:true,
         message:"course Created successfully. you can add lecture now"
      })
      }
)


export const getCourseLectures=CatchasyncError(

  async(req,res,next)=>{

      const course= await COURSE.findById(req.params.id)
      if(!course){
        return next(new errorHandler("course not found ", 400)) // new Error("cant be done") // aisa nai kr sakte he ye wale class me sirf mesage hi pass kr sakte he..or ye wala class ka object jab err me catch hoga to sirf humaree opass mesage hi hoga 
      }

course.views+=1
await course.save()


      res.status(200).json({
          success:true,
          lectures:course.lectures
      })
      
      }

)

// add lecture 
export const addLecture=CatchasyncError(

  async(req,res,next)=>{

const { title,description}=req.body

if(!title || !description){
  return next(new errorHandler("please add all the filed ", 400))
}


const file=req.file;





      const course= await COURSE.findById(req.params.id)
      if(!course){
        return next(new errorHandler("course not found ", 400)) // new Error("cant be done") // aisa nai kr sakte he ye wale class me sirf mesage hi pass kr sakte he..or ye wala class ka object jab err me catch hoga to sirf humaree opass mesage hi hoga 
      }

      const fileUri= getDataUri(file)
      console.log(fileUri.content)
      const myCloud=await cloudinary.v2.uploader.upload(fileUri.content,{
        resource_type:"video"
      })
      console.log(myCloud)
course.lectures.push({
  title,description,video:{
    public_id:myCloud.public_id,
    url:myCloud.url
  },

})

course.numofvideos=course.lectures.length



await course.save()


      res.status(200).json({
          success:true,
          message:"lecture added in course"
      })
      
      }

)



export const deleteCourse=CatchasyncError(
  async (req,res,next)=>{

const {id}=req.params

const course= await COURSE.findById(id)
if(!course){
  return next(new errorHandler("course not found ", 400)) // new Error("cant be done") // aisa nai kr sakte he ye wale class me sirf mesage hi pass kr sakte he..or ye wala class ka object jab err me catch hoga to sirf humaree opass mesage hi hoga 
}

await cloudinary.v2.uploader.destroy(course.poster.public_id)



for(let i=0;i<course.lectures.length;i++){
  const element=course.lectures[i]
  await cloudinary.v2.uploader.destroy(element.video.public_id,{
    resource_type:"video"
  })
}
     
   await course.remove()

      res.status(201).json({
          success:true,
         message:"Course deleted successfully"
      })
      })

      // delete lecture 
      export const deleteLecture=CatchasyncError(
        async (req,res,next)=>{
      
      const {courseid,lectureid}=req.query
      
      const course= await COURSE.findById(courseid)
      if(!course){
        return next(new errorHandler("course not found ", 400)) // new Error("cant be done") // aisa nai kr sakte he ye wale class me sirf mesage hi pass kr sakte he..or ye wala class ka object jab err me catch hoga to sirf humaree opass mesage hi hoga 
      }

const singlelecture=course.lectures.find((item)=>{
  if(item._id.toString()===lectureid.toString()){
    return item
  }
})

await cloudinary.v2.uploader.destroy(singlelecture.video.public_id,{
  resource_type:"video"
})

      
course.lectures=course.lectures.filter((item)=>{
  if(item._id.toString()!==lectureid.toString()){
    return item
  }
})


    course.numofvideos=course.lectures.length
         
      await course.save()
            res.status(201).json({
                success:true,
               message:"Lecture deleted successfully"
            })
            })





    COURSE.watch().on("change",async()=>{

const stats=await STATS.find({}).sort({createdAt:"desc"}).limit(1)

const courses=await COURSE.find({})

let totalviews=0;

for(let i=0;i<courses.length;i++){

  totalviews+=courses[i].views
}

stats[0].views=totalviews;
stats.createdAt=new Date(Date.now())
await stats[0].save()

    })        