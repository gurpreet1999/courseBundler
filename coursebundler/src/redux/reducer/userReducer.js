import { createReducer } from "@reduxjs/toolkit"; 

const initialstate={

}
export const userReducer=createReducer({},{
    loginRequest:(state,action)=>{ // action.type=> ab hume krna nai padega humara.. createreducer bht smart he usse pta he ye jo loginRequest likhe he ye type hi he
        state.loading=true
    },// these are the actions that will be called when the action is dispatched
    loginSucess:(state,action)=>{
        state.loading=false
        state.isAuthenticated=true
        state.user=action.payload.user
        state.message=action.payload.message
    },//ye teeno reducer ko jab maan chaye tab call kr sakta hu with the help of dispatch()
    loginFail:(state,action)=>{
        state.loading=false
        state.isAuthenticated=true
     
        state.error=action.payload
 },
 logoutRequest:(state,action)=>{ // action.type=> ab hume krna nai padega humara.. createreducer bht smart he usse pta he ye jo loginRequest likhe he ye type hi he
    state.loading=true
},// these are the actions that will be called when the action is dispatched
logoutSucess:(state,action)=>{
    state.loading=false
    state.isAuthenticated=false
    state.user=null
    state.message=action.payload
},//ye teeno reducer ko jab maan chaye tab call kr sakta hu with the help of dispatch()
logoutFail:(state,action)=>{
    state.loading=false
    state.isAuthenticated=true
 
    state.error=action.payload
},
 loadUserRequest:(state,action)=>{ // action.type=> ab hume krna nai padega humara.. createreducer bht smart he usse pta he yloadUserRequest likhe he ye type hi he
    state.isAuthenticated=false
    state.user=null
    state.loading=true
},// these are the actions that will be called when the action is dispatched
loadUserSucess:(state,action)=>{
    state.isAuthenticated=true
    state.user=action.payload
    state.loading=false
    
 
  
},//ye teeno reducer ko jab maan chaye tab call kr sakta hu with the help of dispatch()
loadUserFail:(state,action)=>{
    state.loading=false
    state.isAuthenticated=false
 
    state.error=action.payload
},


registerRequest:(state,action)=>{ // action.type=> ab hume krna nai padega humara.. createreducer bht smart he usse pta he ye jo loginRequest likhe he ye type hi he
    state.loading=true
},// these are the actions that will be called when the action is dispatched
registerSucess:(state,action)=>{
    state.loading=false
    state.isAuthenticated=true
    state.user=action.payload.user
    state.message=action.payload.message
},//ye teeno reducer ko jab maan chaye tab call kr sakta hu with the help of dispatch()
registerFail:(state,action)=>{
    state.loading=false
    state.isAuthenticated=false
 
    state.error=action.payload
},


















    clearError:(state)=>{
state.error=null

    },
    clearMessage:(state)=>{
        state.message=null
    }

   




})



export const profileReducer=createReducer({},
{
updateProfileRequest:(state,action)=>{
    state.loading=true
},
updateProfileSuccess:(state,action)=>{
    state.loading=false;
    state.message=action.payload

},

updateProfileFail:(state,action)=>{
    state.loading=false
    state.error=action.payload
},
changePasswordRequest:(state,action)=>{
    state.loading=true
},
changePasswordSuccess:(state,action)=>{
    state.loading=false;
    state.message=action.payload

},

changePasswordFail:(state,action)=>{
    state.loading=false
    state.error=action.payload
},
updateProfilePicRequest:(state,action)=>{
    state.loading=true
},
updateProfilePicSuccess:(state,action)=>{
    state.loading=false;
    state.message=action.payload

},

updateProfilePicFail:(state,action)=>{
    state.loading=false
    state.error=action.payload
}


,
forgetPasswordRequest:(state,action)=>{
    state.loading=true;
},
forgetPasswordSuccess:(state,action)=>{
    state.loading=false;
    state.message=action.payload

},

forgetPasswordFail:(state,action)=>{
    state.loading=false
    state.error=action.payload
},
resetPasswordRequest:(state,action)=>{
    state.loading=true
},
resetPasswordSuccess:(state,action)=>{
    state.loading=false;
    state.message=action.payload

},

resetPasswordFail:(state,action)=>{
    state.loading=false
    state.error=action.payload
},

removeFromPlaylistRequest:(state,action)=>{ // action.type=> ab hume krna nai padega humara.. createreducer bht smart he usse pta he ye jo loginRequest likhe he ye type hi he
    state.loading=true
},// these are the actions that will be called when the action is dispatched
removeFromPlaylistSucess:(state,action)=>{
    state.loading=false
    state.message=action.payload
    
},//ye teeno reducer ko jab maan chaye tab call kr sakta hu with the help of dispatch()
removeFromPlaylistFail:(state,action)=>{
    state.loading=false
   
  state.error=action.payload
},










 clearError:(state)=>{
    state.error=null
    
        },
        clearMessage:(state)=>{
            state.message=null
        }

})


export const subscriptionReducer=createReducer({},{
buySubscriptionRequest:(state,action)=>{
    state.loading=true
},
buySubscriptionSuccess:(state,action)=>{
    state.loading=false
    state.subscriptionId=action.payload
}
,
buySubscriptionFail:(state,action)=>{
    state.loading=false
    state.error=action.payload
}
,
cancelSubscriptionRequest:(state,action)=>{
    state.loading=true
},
cancelSubscriptionSuccess:(state,action)=>{
    state.loading=false
    state.subscriptionId=action.payload
}
,
cancelSubscriptionFail:(state,action)=>{
    state.loading=false
    state.message=action.payload
}
,
clearError:(state)=>{
    state.error=null
    
        },
        clearMessage:(state)=>{
            state.message=null
        }



})



