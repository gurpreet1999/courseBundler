

import { configureStore } from '@reduxjs/toolkit'
import { adminReducer } from './reducer/admimReducer'
import { courseReducer } from './reducer/courseReducer'
import { profileReducer, subscriptionReducer, userReducer } from './reducer/userReducer'





// ye reducer naam ka object he humare pass
const store=configureStore({
    reducer:{
    users: userReducer,
    profile:profileReducer,
    courses:courseReducer,
    subscription:subscriptionReducer,
    admin:adminReducer
   
    }
   
})

export default store






















