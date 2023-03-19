  import {createReducer} from "@reduxjs/toolkit"
  
  
  export const courseReducer=createReducer({courses:[],lectures:[]},{
    
    allCourseRequest:(state,action)=>{ // action.type=> ab hume krna nai padega humara.. createreducer bht smart he usse pta he ye jo loginRequest likhe he ye type hi he
        state.loading=true
    },// these are the actions that will be called when the action is dispatched
    allCourseSucess:(state,action)=>{
        state.loading=false
        state.courses=action.payload
        
    },//ye teeno reducer ko jab maan chaye tab call kr sakta hu with the help of dispatch()
    allCourseFail:(state,action)=>{
        state.loading=false
       
     
        state.error=action.payload
 },

addToPlaylistRequest:(state,action)=>{ // action.type=> ab hume krna nai padega humara.. createreducer bht smart he usse pta he ye jo loginRequest likhe he ye type hi he
    state.loading=true
},// these are the actions that will be called when the action is dispatched
addToPlaylistSucess:(state,action)=>{
    state.loading=false
    state.message=action.payload
    
},//ye teeno reducer ko jab maan chaye tab call kr sakta hu with the help of dispatch()
addToPlaylistFail:(state,action)=>{
    state.loading=false
   
  state.error=action.payload
},


gtCourseRequest:(state,action)=>{ // action.type=> ab hume krna nai padega humara.. createreducer bht smart he usse pta he ye jo loginRequest likhe he ye type hi he
    state.loading=true
},// these are the actions that will be called when the action is dispatched
gtCourseSucess:(state,action)=>{
    state.loading=false
    state.lectures=action.payload
    
},//ye teeno reducer ko jab maan chaye tab call kr sakta hu with the help of dispatch()
gtCourseFail:(state,action)=>{
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