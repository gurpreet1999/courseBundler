import mongoose from "mongoose";

const schema=new mongoose.Schema({


    title:{
        type:String,
        required:[true,"Please enter description"]
       ,minLength:[5,"Description  must be at least 5 character"]
    },

    description:{
        type:String,
        required:[true,"please enter product description"],
        maxLength:[30," Title caanot exceed 0 character"]
        ,minLength:[4,"Title must be at least 4 character"]
    },

    lectures:[
        {

           title:{ type:String,
            required:true
        },
        description:{ type:String,
            required:true
        },
            video:
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
        
        }],

        poster:
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
            views:{
                type:Number,
               
                default:0
            },

            numofvideos:{
                type:Number,
               
                default:0
            },

            category:{
                type:String,
                required:[true,"pls enter course category"]
            },

            createdby:{
                type:String,
                required:[true,"pls enter course creator name"]
            },
            createdAt:{
                type:Date,
                default:Date.now()
            }

})




export const COURSE=mongoose.model("COURSE",schema,"course")





