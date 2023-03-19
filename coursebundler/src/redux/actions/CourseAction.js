
import axios from "axios"



 

export function getAllCourses(category="",keyword){


return async function(dispath){


    try{
        dispath({type:"allCourseRequest"})
        const {data}=await axios.get(` http://localhost:4000/api/v1/course?keyword=${keyword}&category=${category}`
    )
       
    console.log(data)
    
       dispath({type:'allCourseSucess',payload:data.courses})
    
    }
    
    
    
    
    
    
    catch(error){
    
        dispath({type:'allCourseFail',payload:error.response.data.message})
    
    }



}



}




export function getCourseLecture(courseid){


    return async function(dispath){
    
    
        try{
            dispath({type:"gtCourseRequest"})
            const {data}=await axios.get(` http://localhost:4000/api/v1/course/${courseid}`,{
              withCredentials:true  
            }
        )
           
        console.log(data)
        
           dispath({type:'gtCourseSucess',payload:data.lectures})
        
        }
        
        
        
        
        
        
        catch(error){
        
            dispath({type:'gtCourseFail',payload:error.response.data.message})
        
        }
    
    
    
    }
    
    
    
    }
    
    
    