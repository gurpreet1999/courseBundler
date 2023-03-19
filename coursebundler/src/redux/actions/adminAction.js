import axios from "axios"



 

export function CreateCourse(formdata){


return async function(dispath){


    try{
        dispath({type:"createCourseRequest"})
        const {data}=await axios.post(` http://localhost:4000/api/v1/createcourse`,formdata,{
headers:{
    "Content-type":"multipart/form-data"
},
withCredentials:true
        }
    )
       
    console.log(data)
    
       dispath({type:'createCourseSuccess',payload:data.message})
    
    }
    
    
    
    
    
    
    catch(error){
    
        dispath({type:'createCourseFail',payload:error.response.data.message})
    
    }



}



}

export function deleteCourse(id){


    return async function(dispath){
    
    
        try{
            dispath({type:"deleteCourseRequest"})
            const {data}=await axios.delete(` http://localhost:4000/api/v1/course/${id}`,{
    
    withCredentials:true
            }
        )
           
        console.log(data)
        
           dispath({type:'deleteCourseSuccess',payload:data.message})
        
        }
        
        
        
        
        
        
        catch(error){
        
            dispath({type:'deleteCourseFail',payload:error.response.data.message})
        
        }
    
    
    
    }
    
    
    
    }





    export function deleteLecture(id,formdata){


        return async function(dispath){
        
        
            try{
                dispath({type:"addLectureRequest"})
                const {data}=await axios.post(` http://localhost:4000/api/v1/course/${id}`,formdata,{
        headers:{
            "Content-type":"multipart/form-data"
        },
        withCredentials:true
                }
            )
               
            console.log(data)
            
               dispath({type:'addLectureSuccess',payload:data.message})
            
            }
            
            
            
            
            
            
            catch(error){
            
                dispath({type:'addLectureFail',payload:error.response.data.message})
            
            }
        
        
        
        }
        
        
        
        }




        export function deleteLectureFunction(courseId,lectureId){


            return async function(dispath){
            
            
                try{
                    dispath({type:"deleteLectureRequest"})
                    const {data}=await axios.delete(` http://localhost:4000/api/v1/lecture?courseId=${courseId}&lectureId=${lectureId}`,{
            
            withCredentials:true
                    }
                )
                   
                console.log(data)
                
                   dispath({type:'deleteLectureSuccess',payload:data.message})
                
                }
                
                
                
                
                
                
                catch(error){
                
                    dispath({type:'deleteLectureFail',payload:error.response.data.message})
                
                }
            
            
            
            }
            
            
            
            }
              





            
export function getALLuser(){


    return async function(dispath){
    
    
        try{
            dispath({type:"getAllUserRequest"})
            const {data}=await axios.get(` http://localhost:4000/api/v1/admin/users`,{
  
    withCredentials:true
            }
        )
           
        console.log(data)
        
           dispath({type:'getAllUserSuccess',payload:data.users})
        
        }
        
        
        
        
        
        
        catch(error){
        
            dispath({type:'getAllUserFail',payload:error.response.data.message})
        
        }
    
    
    
    }
    
    
    
    }



    export function updateUserRole(userid){


        return async function(dispath){
        
        
            try{
                dispath({type:"updateUserRoleRequest"})
                const {data}=await axios.put(` http://localhost:4000/api/v1/admin/users/${userid}`,{},{
      
        withCredentials:true
                }
            )
               
            console.log(data)
            
               dispath({type:'updateUserRoleSuccess',payload:data.message})
            
            }
            
            
            
            
            
            
            catch(error){
            
                dispath({type:'updateUserRoleFail',payload:error.response.data.message})
            
            }
        
        
        
        }
        
        
        
        }