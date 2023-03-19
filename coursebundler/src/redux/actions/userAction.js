

import axios from "axios"



 

export function login(email,password){


return async function(dispath){


    try{
        dispath({type:"loginRequest"})
        const {data}=await axios.post(` http://localhost:4000/api/v1/login`,{
            email,password
        },{
            headers:{
                'Content-type':'application/json'
            },
          withCredentials:true  // jisme vi cookie ka use ayya he...usme namdatory credintial:true krna hoga nai to kaam nai krega 
        })
       
    console.log(data)
    
       dispath({type:'loginSucess',payload:data})
    
    }
    
    
    
    
    
    
    catch(error){
    
        dispath({type:'loginFail',payload:error.response.data.message})
    
    }



}



}



export function getMyProfile(){


    return async function(dispath){
    
    
        try{
            dispath({type:"loadUserRequest"})
            const {data}=await axios.get(` http://localhost:4000/api/v1/me`,
            {withCredentials:true})
           
        console.log(data)
        
           dispath({type:'loadUserSucess',payload:data.user})
        
        }
        
        
        
        
        
        
        catch(error){
        
            dispath({type:'loadUserFail',payload:error.response.data.message})
        
        }
    
    
    
    }
    
    
    
    }

    


    export function logOut(){


        return async function(dispath){
        
        
            try{
                dispath({type:"logoutRequest"})
                const {data}=await axios.get(` http://localhost:4000/api/v1/logout`,
                {withCredentials:true})
               
            console.log(data)
            
               dispath({type:'logoutSucess',payload:data.message})
            
            }
            
            
            
            
            
            
            catch(error){
            
                dispath({type:'logoutFail',payload:error.response.data.message})
            
            }
        
        
        
        }
        
        
        
        }



        export function registerUser(myform){
console.log(myform)

            return async function(dispath){
            
            
                try{
                    dispath({type:"registerRequest"})
                    const {data}=await axios.post(` http://localhost:4000/api/v1/registeruser`,
                        myform,
    {
                      
                      withCredentials:true  // jisme vi cookie ka use ayya he...usme namdatory credintial:true krna hoga nai to kaam nai krega 
                    })
                   
                console.log(data)
                
                   dispath({type:'registerSucess',payload:data})
                
                }
                
                
                
                
                
                
                catch(error){
                
                    dispath({type:'registerFail',payload:error.response.data.message})
                
                }
            
            
            
            }
            
            
            
            }


            export function buySubscription(){
  
                
                            return async function(dispath){
                            
                            
                                try{
                                    dispath({type:"buySubscriptionRequest"})
                                    const {data}=await axios.get(` http://localhost:4000/api/v1/subscribe`
                                        
                    ,{ withCredentials:true  // jisme vi cookie ka use ayya he...usme namdatory credintial:true krna hoga nai to kaam nai krega 
                   })
                                   
                                console.log(data)
                                
                                   dispath({type:'buySubscriptionSuccess',payload:data.subscriptionId})
                                
                                }
                                
                                
                                
                                
                                
                                
                                catch(error){
                                
                                    dispath({type:'buySubscriptionFail',payload:error.response.data.message})
                                
                                }
                            
                            
                            
                            }
                            
                            
                            
                            }
                


                            export function cancelSubscription(){
                            
                                                                
                                            return async function(dispath){
                                            
                                            
                                                try{
                                                    dispath({type:"cancelSubscriptionRequest"})
                                                    const {data}=await axios.delete(` http://localhost:4000/api/v1/cancelsubscription`
                                                        
                                    ,{ withCredentials:true  // jisme vi cookie ka use ayya he...usme namdatory credintial:true krna hoga nai to kaam nai krega 
                                   })
                                                   
                                                console.log(data)

                                                
                                                
                                                   dispath({type:'cancelSubscriptionSuccess',payload:data.message})
                                                
                                                }
                                                
                                                
                                                
                                                
                                                
                                                
                                                catch(error){
                                                
                                                    dispath({type:'cancelSubscriptionFail',payload:error.response.data.message})
                                                
                                                }
                                            
                                            
                                            
                                            }
                                            
                                            
                                            
                                            }