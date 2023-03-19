

import axios from "axios";


export function updateProfile(name,email){

return  async function (dispatch){
try{
    dispatch({type:"updateProfileRequest"})

const {data}=await axios.put(`http://localhost:4000/api/v1/updateprofile`,{
    name,email
},{
    headers:{
        'Content-type':'application/json'
    },
  withCredentials:true  
})



    dispatch({type:"updateProfileSuccess",payload:data.message})
}
catch(error){

    dispatch({type:"updateProfileFail",payload:error.response.data.message})
}







}


}


export function changePassword(oldpassword,newpassword){

    return  async function (dispatch){
    try{
        dispatch({type:"changePasswordRequest"})
    
    const {data}=await axios.put(`http://localhost:4000/api/v1/changepassword`,{
        oldpassword,newpassword
    },{
        headers:{
            'Content-type':'application/json'
        },
      withCredentials:true  
    })
    
    
    
        dispatch({type:"changePasswordSuccess",payload:data.message})
    }
    catch(error){
    
        dispatch({type:"changePasswordFail",payload:error.response.data.message})
    }
    
    
    
    
    
    
    
    }
    
    
    }
    

    
export function updateProfilePic(formdata){

    return  async function (dispatch){
    try{
        dispatch({type:"updateProfilePicRequest"})
    
    const {data}=await axios.put(`http://localhost:4000/api/v1/updateprofilepic`,formdata,{
        
      withCredentials:true  
    })
    
    
    
        dispatch({type:"updateProfilePicSuccess",payload:data.message})
    }
    catch(error){
    
        dispatch({type:"updateProfilePicFail",payload:error.response.data.message})
    }
    
    
    
    
    
    
    
    }
    
    
    }
    


    export function resetPassword(token,password){

        return  async function (dispatch){
        try{
            dispatch({type:"resetPasswordRequest"})
        
        const {data}=await axios.put(`http://localhost:4000/api/v1/resetpassword/${token}`,{
       password
        },{
            headers:{
                'Content-type':'application/json'
            },
          withCredentials:true  
        })
        
        
        
            dispatch({type:"resetPasswordSuccess",payload:data.message})
        }
        catch(error){
        
            dispatch({type:"resetPasswordFail",payload:error.response.data.message})
        }
        
        
        
        
        
        
        
        }
        
        
        }
        
        export function forgetPassword(email){

            return  async function (dispatch){
            try{
                dispatch({type:"forgetPasswordRequest"})
            
            const {data}=await axios.post(`http://localhost:4000/api/v1/forgetpassword`,{
               email
            },{
                headers:{
                    'Content-type':'application/json'
                },
              withCredentials:true  
            })
            
            console.log(data)
            
                dispatch({type:"forgetPasswordSuccess",payload:data.message})
            }
            catch(error){
            
                dispatch({type:"forgetPasswordFail",payload:error.response.data.message})
            }
            
            
            
            
            
            
            
            }
            
            
            }


    export function addtoplaylist(courseid){


  return async function(dispath){
                
                
      try{
      dispath({type:"addToPlaylistRequest"})
       const {data}=await axios.post(` http://localhost:4000/api/v1/addtoplaylist`
       ,{
        courseid
       },{
        headers:{
            'Content-type':'application/json'
        },
      withCredentials:true  
    })
                       
      console.log(data)
                    
       dispath({type:'addToPlaylistSucess',payload:data.message})
                    
      }catch(error){
                    
     dispath({type:'addToPlaylistFail',payload:error.response.data.message})
               
   }   } }
                
            

   
   export function removefromplaylist(courseid){


    return async function(dispath){
                  
                  
        try{
        dispath({type:"removeFromPlaylistRequest"})
         const {data}=await axios.delete(` http://localhost:4000/api/v1/removefromplaylist?id=${id}`
         ,{
          
        withCredentials:true  
      })
                         
        console.log(data)
                      
         dispath({type:'removeFromPlaylistSucess',payload:data.message})
                      
        }catch(error){
                      
       dispath({type:'removeFromPlaylistFail',payload:error.response.data.message})
                 
     }   } }